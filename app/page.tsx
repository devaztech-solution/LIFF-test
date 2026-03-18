import Image from "next/image";

export default function Home() {
  return (
    <div className="flex bg-zinc-50 font-sans dark:bg-black p-6">
      Hello anyone, this is a test page for the new Next.js 13 app directory. It is using the new app layout and page structure. The layout is defined in the app/layout.tsx file and the page is defined in the app/page.tsx file. The layout is using the Geist font from Google Fonts and the page is using the default font. The page is also using the new Image component from Next.js to optimize images.
    </div>
  );
}
