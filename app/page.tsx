"use client"; // สำคัญมาก: ต้องประกาศเป็น Client Component

import { useEffect, useState } from "react";

type LineProfile = {
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export default function Home() {
  const [profile, setProfile] = useState<LineProfile | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  let liff: any;


  // ฟังก์ชันสำหรับจัดการ LIFF
    const initLiff = async () => {
      try {
       liff = await import("@line/liff");
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) {
          throw new Error("NEXT_PUBLIC_LIFF_ID is not set");
        }
        await liff.init({ liffId });
        
        if (liff.isLoggedIn()) {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
          setIsLogin(true);
        } 
      } catch (err) {
        console.error("LIFF Initialization failed", err);
      }
    };

  useEffect(() => {

    initLiff();
  }, []); // [] ว่างเปล่า เพื่อให้ทำงานแค่ครั้งเดียวตอน Mount

  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black p-6 min-h-screen">
      <h1 className="text-xl font-bold mb-4">LIFF Profile Test</h1>
      
      {profile && isLogin ? (
        <div className="flex items-center gap-4 border p-4 rounded-lg bg-white dark:bg-zinc-900">
          {profile.pictureUrl && (
            <img 
              src={profile.pictureUrl} 
              alt="Profile" 
              className="w-16 h-16 rounded-full" 
            />
          )}
          <div>
            <p className="font-semibold text-zinc-900 dark:text-white">{profile.displayName}</p>
            <p className="text-sm text-zinc-500">{profile.statusMessage}</p>
          </div>

          <pre>
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      ) : (
        <div>
          <button onClick={() => liff.login()} className="p-2 rounded-lg border cursor-pointer">Login with LINE</button>
        </div>
      )}

      <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
        Hello anyone, this is a test page for the new Next.js 13 app directory...
      </div>
    </div>
  );
}