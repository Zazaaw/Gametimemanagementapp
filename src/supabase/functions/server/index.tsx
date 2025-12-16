import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f627ddd3/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ AUTH ROUTES ============

// Sign up
app.post("/make-server-f627ddd3/auth/signup", async (c) => {
  try {
    const { email, password, name, username } = await c.req.json();

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, username },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (authError) {
      console.log('Auth signup error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store user profile in KV store
    await kv.set(`user:${authData.user.id}`, {
      id: authData.user.id,
      email,
      name,
      username,
      profileImage: '',
      phone: '',
      birthdate: '',
      createdAt: new Date().toISOString(),
    });

    // Initialize user settings
    await kv.set(`settings:${authData.user.id}`, {
      dailyLimit: 120,
      weeklyLimit: 840,
      breakReminder: true,
      limitWarning: true,
      sound: true,
      nightMode: true,
      vibration: true,
    });

    return c.json({ 
      success: true, 
      user: authData.user,
      message: 'Akun berhasil dibuat!' 
    });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Gagal membuat akun' }, 500);
  }
});

// Sign in
app.post("/make-server-f627ddd3/auth/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Auth signin error:', error);
      return c.json({ error: 'Email atau password salah' }, 401);
    }

    return c.json({ 
      success: true,
      accessToken: data.session.access_token,
      user: data.user,
    });
  } catch (error) {
    console.log('Signin error:', error);
    return c.json({ error: 'Gagal login' }, 500);
  }
});

// ============ USER ROUTES ============

// Get user profile
app.get("/make-server-f627ddd3/user/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profile = await kv.get(`user:${user.id}`);
    const settings = await kv.get(`settings:${user.id}`);

    return c.json({ 
      profile: profile || {
        id: user.id,
        email: user.email,
        name: user.user_metadata.name || '',
        username: user.user_metadata.username || '',
        profileImage: '',
        phone: '',
        birthdate: '',
      },
      settings: settings || {
        dailyLimit: 120,
        weeklyLimit: 840,
        breakReminder: true,
        limitWarning: true,
        sound: true,
        nightMode: true,
        vibration: true,
      }
    });
  } catch (error) {
    console.log('Get profile error:', error);
    return c.json({ error: 'Gagal mengambil profil' }, 500);
  }
});

// Update user profile
app.put("/make-server-f627ddd3/user/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const updates = await c.req.json();
    const currentProfile = await kv.get(`user:${user.id}`) || {};

    await kv.set(`user:${user.id}`, {
      ...currentProfile,
      ...updates,
      id: user.id,
      updatedAt: new Date().toISOString(),
    });

    return c.json({ success: true, message: 'Profil berhasil diupdate!' });
  } catch (error) {
    console.log('Update profile error:', error);
    return c.json({ error: 'Gagal mengupdate profil' }, 500);
  }
});

// Update settings
app.put("/make-server-f627ddd3/user/settings", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const settings = await c.req.json();
    await kv.set(`settings:${user.id}`, settings);

    return c.json({ success: true, message: 'Pengaturan berhasil disimpan!' });
  } catch (error) {
    console.log('Update settings error:', error);
    return c.json({ error: 'Gagal menyimpan pengaturan' }, 500);
  }
});

// ============ GAMING SESSION ROUTES ============

// Start gaming session
app.post("/make-server-f627ddd3/session/start", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { gameName, gameIcon, gameColor } = await c.req.json();
    const sessionId = `session:${user.id}:${Date.now()}`;

    await kv.set(sessionId, {
      userId: user.id,
      gameName,
      gameIcon,
      gameColor,
      startTime: new Date().toISOString(),
      endTime: null,
      duration: 0,
      isActive: true,
    });

    // Set as current active session
    await kv.set(`current_session:${user.id}`, sessionId);

    return c.json({ success: true, sessionId });
  } catch (error) {
    console.log('Start session error:', error);
    return c.json({ error: 'Gagal memulai sesi' }, 500);
  }
});

// End gaming session
app.post("/make-server-f627ddd3/session/end", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { duration } = await c.req.json();
    const currentSessionId = await kv.get(`current_session:${user.id}`);

    if (!currentSessionId) {
      return c.json({ error: 'Tidak ada sesi aktif' }, 400);
    }

    const session = await kv.get(currentSessionId);
    if (session) {
      await kv.set(currentSessionId, {
        ...session,
        endTime: new Date().toISOString(),
        duration,
        isActive: false,
      });
    }

    // Clear current session
    await kv.del(`current_session:${user.id}`);

    return c.json({ success: true, message: 'Sesi selesai!' });
  } catch (error) {
    console.log('End session error:', error);
    return c.json({ error: 'Gagal mengakhiri sesi' }, 500);
  }
});

// Get user sessions
app.get("/make-server-f627ddd3/sessions", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const sessions = await kv.getByPrefix(`session:${user.id}:`);
    
    // Sort by startTime descending
    const sortedSessions = sessions.sort((a: any, b: any) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );

    return c.json({ sessions: sortedSessions });
  } catch (error) {
    console.log('Get sessions error:', error);
    return c.json({ error: 'Gagal mengambil sesi' }, 500);
  }
});

// Get statistics
app.get("/make-server-f627ddd3/stats", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const sessions = await kv.getByPrefix(`session:${user.id}:`);
    
    // Calculate stats
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    let todayMinutes = 0;
    let weeklyTotal = 0;
    const dailyData: any = {};

    sessions.forEach((session: any) => {
      if (!session.isActive && session.duration) {
        const sessionDate = new Date(session.startTime);
        const sessionDay = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
        
        // Today's total
        if (sessionDay.getTime() === today.getTime()) {
          todayMinutes += session.duration;
        }

        // Weekly total
        if (sessionDay >= weekStart) {
          weeklyTotal += session.duration;
          
          // Daily breakdown
          const dayKey = sessionDay.toISOString().split('T')[0];
          dailyData[dayKey] = (dailyData[dayKey] || 0) + session.duration;
        }
      }
    });

    return c.json({ 
      todayMinutes,
      weeklyTotal,
      dailyData,
      totalSessions: sessions.filter((s: any) => !s.isActive).length,
    });
  } catch (error) {
    console.log('Get stats error:', error);
    return c.json({ error: 'Gagal mengambil statistik' }, 500);
  }
});

Deno.serve(app.fetch);