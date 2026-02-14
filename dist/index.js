#!/usr/bin/env node
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const execAsync = promisify(exec);
// Ensure project directory
function ensureProjectDir(projectName) {
    const dir = join(process.cwd(), projectName);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
    return dir;
}
// Check if shadcn is installed
async function checkShadcn() {
    try {
        await execAsync('which npx');
        return true;
    }
    catch {
        return false;
    }
}
// Initialize Next.js + shadcn project
async function initProject(config) {
    const projectDir = ensureProjectDir(config.name);
    try {
        // Check Node version - Next.js 15+ requires Node 18.17+
        const { stdout: nodeVersion } = await execAsync('node --version');
        const majorVersion = parseInt(nodeVersion.replace('v', '').split('.')[0]);
        const minorVersion = parseInt(nodeVersion.replace('v', '').split('.')[1]);
        if (majorVersion < 18 || (majorVersion === 18 && minorVersion < 17)) {
            return { success: false, error: 'Node.js 18.17+ required for Next.js 15+' };
        }
        // Initialize Next.js 15+ with shadcn
        console.log('🚀 Initializing Next.js 15+ with shadcn...');
        // Create Next.js project with latest version
        console.log('📦 Creating Next.js project...');
        await execAsync(`npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --no-turbopack`, { cwd: projectDir });
        // Navigate to project and initialize shadcn
        console.log('🎨 Initializing shadcn/ui...');
        await execAsync(`echo "my-app" | npx shadcn@latest init --yes --base-color ${config.theme === 'dark' ? 'neutral' : 'stone'}`, { cwd: projectDir });
        // Install additional shadcn components
        const components = ['button', 'card', 'input', 'badge', 'separator', 'scroll-area', 'tooltip', 'dialog'];
        for (const component of components) {
            console.log(`📦 Installing ${component}...`);
            await execAsync(`npx shadcn@latest add ${component} -y`);
        }
        // Install additional dependencies with specific latest versions
        console.log('📦 Installing latest dependencies...');
        await execAsync('npm install framer-motion@latest next-seo@latest lucide-react@latest clsx@latest tailwind-merge@latest');
        return { success: true };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
// Generate aesthetic CSS variables
function generateAestheticCSS(aesthetic, theme) {
    const aesthetics = {
        'cyber-neon': {
            dark: `
:root {
  --background: 0 0% 4%;
  --foreground: 0 0% 95%;
  --card: 0 0% 6%;
  --card-foreground: 0 0% 95%;
  --popover: 0 0% 6%;
  --popover-foreground: 0 0% 95%;
  --primary: 180 100% 50%;
  --primary-foreground: 0 0% 4%;
  --secondary: 300 100% 50%;
  --secondary-foreground: 0 0% 95%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 65%;
  --accent: 60 100% 50%;
  --accent-foreground: 0 0% 4%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 95%;
  --border: 0 0% 20%;
  --input: 0 0% 20%;
  --ring: 180 100% 50%;
  --radius: 0.5rem;
  --font-sans: 'Geist', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
            `,
            light: `
:root {
  --background: 0 0% 98%;
  --foreground: 0 0% 10%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 10%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 10%;
  --primary: 180 100% 40%;
  --primary-foreground: 0 0% 98%;
  --secondary: 300 100% 45%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 92%;
  --muted-foreground: 0 0% 40%;
  --accent: 60 100% 50%;
  --accent-foreground: 0 0% 10%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 85%;
  --input: 0 0% 85%;
  --ring: 180 100% 40%;
  --radius: 0.5rem;
  --font-sans: 'Geist', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
            `
        },
        'brutalist': {
            dark: `
:root {
  --background: 0 0% 8%;
  --foreground: 0 0% 98%;
  --card: 0 0% 12%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 12%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 8%;
  --secondary: 0 0% 25%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 20%;
  --muted-foreground: 0 0% 60%;
  --accent: 0 100% 50%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 30%;
  --input: 0 0% 30%;
  --ring: 0 0% 98%;
  --radius: 0px;
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'Space Mono', monospace;
}
            `,
            light: `
:root {
  --background: 0 0% 96%;
  --foreground: 0 0% 8%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 8%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 8%;
  --primary: 0 0% 8%;
  --primary-foreground: 0 0% 96%;
  --secondary: 0 0% 85%;
  --secondary-foreground: 0 0% 8%;
  --muted: 0 0% 90%;
  --muted-foreground: 0 0% 40%;
  --accent: 0 100% 50%;
  --accent-foreground: 0 0% 96%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 0%;
  --input: 0 0% 80%;
  --ring: 0 0% 8%;
  --radius: 0px;
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'Space Mono', monospace;
}
            `
        },
        'organic': {
            dark: `
:root {
  --background: 150 20% 8%;
  --foreground: 40 30% 95%;
  --card: 150 15% 12%;
  --card-foreground: 40 30% 95%;
  --popover: 150 15% 12%;
  --popover-foreground: 40 30% 95%;
  --primary: 140 40% 45%;
  --primary-foreground: 0 0% 98%;
  --secondary: 30 40% 50%;
  --secondary-foreground: 0 0% 98%;
  --muted: 150 10% 20%;
  --muted-foreground: 40 20% 65%;
  --accent: 35 80% 55%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 60% 50%;
  --destructive-foreground: 0 0% 98%;
  --border: 150 15% 25%;
  --input: 150 15% 25%;
  --ring: 140 40% 45%;
  --radius: 1rem;
  --font-sans: 'Instrument Serif', Georgia, serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
            `,
            light: `
:root {
  --background: 40 30% 97%;
  --foreground: 150 20% 15%;
  --card: 40 25% 100%;
  --card-foreground: 150 20% 15%;
  --popover: 40 25% 100%;
  --popover-foreground: 150 20% 15%;
  --primary: 140 40% 35%;
  --primary-foreground: 0 0% 98%;
  --secondary: 30 40% 55%;
  --secondary-foreground: 0 0% 98%;
  --muted: 40 20% 92%;
  --muted-foreground: 150 10% 40%;
  --accent: 35 80% 50%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 60% 50%;
  --destructive-foreground: 0 0% 98%;
  --border: 40 20% 85%;
  --input: 40 20% 85%;
  --ring: 140 40% 35%;
  --radius: 1rem;
  --font-sans: 'Instrument Serif', Georgia, serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
            `
        },
        'retro-future': {
            dark: `
:root {
  --background: 220 30% 8%;
  --foreground: 45 80% 95%;
  --card: 220 25% 12%;
  --card-foreground: 45 80% 95%;
  --popover: 220 25% 12%;
  --popover-foreground: 45 80% 95%;
  --primary: 280 70% 55%;
  --primary-foreground: 0 0% 98%;
  --secondary: 45 90% 50%;
  --secondary-foreground: 220 30% 8%;
  --muted: 220 20% 20%;
  --muted-foreground: 45 40% 70%;
  --accent: 190 80% 50%;
  --accent-foreground: 220 30% 8%;
  --destructive: 0 70% 55%;
  --destructive-foreground: 0 0% 98%;
  --border: 220 20% 25%;
  --input: 220 20% 25%;
  --ring: 280 70% 55%;
  --radius: 0.25rem;
  --font-sans: 'Orbitron', system-ui, sans-serif;
  --font-mono: 'Share Tech Mono', monospace;
}
            `,
            light: `
:root {
  --background: 45 30% 96%;
  --foreground: 220 30% 15%;
  --card: 45 25% 100%;
  --card-foreground: 220 30% 15%;
  --popover: 45 25% 100%;
  --popover-foreground: 220 30% 15%;
  --primary: 280 60% 50%;
  --primary-foreground: 0 0% 98%;
  --secondary: 45 90% 50%;
  --secondary-foreground: 220 30% 15%;
  --muted: 45 20% 92%;
  --muted-foreground: 220 20% 45%;
  --accent: 190 70% 45%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 70% 55%;
  --destructive-foreground: 0 0% 98%;
  --border: 45 20% 85%;
  --input: 45 20% 85%;
  --ring: 280 60% 50%;
  --radius: 0.25rem;
  --font-sans: 'Orbitron', system-ui, sans-serif;
  --font-mono: 'Share Tech Mono', monospace;
}
            `
        },
        'editorial': {
            dark: `
:root {
  --background: 220 20% 6%;
  --foreground: 30 20% 95%;
  --card: 220 15% 10%;
  --card-foreground: 30 20% 95%;
  --popover: 220 15% 10%;
  --popover-foreground: 30 20% 95%;
  --primary: 30 60% 55%;
  --primary-foreground: 220 20% 6%;
  --secondary: 220 15% 20%;
  --secondary-foreground: 30 20% 95%;
  --muted: 220 10% 18%;
  --muted-foreground: 30 10% 65%;
  --accent: 0 60% 55%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 60% 50%;
  --destructive-foreground: 0 0% 98%;
  --border: 220 10% 25%;
  --input: 220 10% 25%;
  --ring: 30 60% 55%;
  --radius: 0px;
  --font-sans: 'Playfair Display', Georgia, serif;
  --font-mono: 'Fira Code', monospace;
}
            `,
            light: `
:root {
  --background: 30 20% 97%;
  --foreground: 220 20% 12%;
  --card: 30 20% 100%;
  --card-foreground: 220 20% 12%;
  --popover: 30 20% 100%;
  --popover-foreground: 220 20% 12%;
  --primary: 30 60% 45%;
  --primary-foreground: 0 0% 98%;
  --secondary: 220 15% 92%;
  --secondary-foreground: 220 20% 12%;
  --muted: 30 15% 94%;
  --muted-foreground: 220 10% 45%;
  --accent: 0 60% 50%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 60% 50%;
  --destructive-foreground: 0 0% 98%;
  --border: 30 15% 85%;
  --input: 30 15% 85%;
  --ring: 30 60% 45%;
  --radius: 0px;
  --font-sans: 'Playfair Display', Georgia, serif;
  --font-mono: 'Fira Code', monospace;
}
            `
        },
        'minimal-luxury': {
            dark: `
:root {
  --background: 0 0% 7%;
  --foreground: 40 20% 96%;
  --card: 0 0% 10%;
  --card-foreground: 40 20% 96%;
  --popover: 0 0% 10%;
  --popover-foreground: 40 20% 96%;
  --primary: 40 30% 65%;
  --primary-foreground: 0 0% 7%;
  --secondary: 0 0% 18%;
  --secondary-foreground: 40 20% 96%;
  --muted: 0 0% 15%;
  --muted-foreground: 40 10% 60%;
  --accent: 40 40% 70%;
  --accent-foreground: 0 0% 7%;
  --destructive: 0 50% 50%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 22%;
  --input: 0 0% 22%;
  --ring: 40 30% 65%;
  --radius: 0.125rem;
  --font-sans: 'Cormorant Garamond', 'Times New Roman', serif;
  --font-mono: 'Source Code Pro', monospace;
}
            `,
            light: `
:root {
  --background: 40 20% 98%;
  --foreground: 0 0% 10%;
  --card: 40 20% 100%;
  --card-foreground: 0 0% 10%;
  --popover: 40 20% 100%;
  --popover-foreground: 0 0% 10%;
  --primary: 40 30% 45%;
  --primary-foreground: 0 0% 98%;
  --secondary: 40 10% 94%;
  --secondary-foreground: 0 0% 10%;
  --muted: 40 10% 96%;
  --muted-foreground: 0 0% 45%;
  --accent: 40 40% 55%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 50% 50%;
  --destructive-foreground: 0 0% 98%;
  --border: 40 10% 88%;
  --input: 40 10% 88%;
  --ring: 40 30% 45%;
  --radius: 0.125rem;
  --font-sans: 'Cormorant Garamond', 'Times New Roman', serif;
  --font-mono: 'Source Code Pro', monospace;
}
            `
        }
    };
    return aesthetics[aesthetic][theme] || aesthetics['cyber-neon'][theme];
}
// Generate SEO metadata
function generateSEOConfig(projectName, description) {
    return {
        title: `${projectName} - Premium Frontend Experience`,
        description: description || 'A distinctive, production-grade frontend interface crafted with meticulous attention to aesthetic details.',
        keywords: ['frontend', 'design', 'web', 'react', 'nextjs', 'shadcn', 'ui', 'ux'],
        openGraph: {
            title: projectName,
            description: description,
            type: 'website',
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: projectName,
            description: description,
        },
        robots: 'index, follow',
        viewport: 'width=device-width, initial-scale=1',
    };
}
// CLI
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    if (!command || command === 'help' || command === '--help') {
        console.log('moltron-frontend - Frontend Specialist with shadcn/ui');
        console.log('');
        console.log('Commands:');
        console.log('  init <name>          Initialize new project with shadcn');
        console.log('  component <name>     Generate a new component');
        console.log('  page <name>          Generate a new page');
        console.log('  layout               Generate root layout with SEO');
        console.log('');
        console.log('Aesthetics:');
        console.log('  cyber-neon, brutalist, organic, retro-future, editorial, minimal-luxury');
        console.log('');
        console.log('Examples:');
        console.log('  node dist/index.js init my-app --aesthetic cyber-neon --dark');
        console.log('  node dist/index.js component CardGrid --aesthetic brutalist');
        process.exit(0);
    }
    if (command === 'init') {
        const projectName = args[1];
        if (!projectName) {
            console.error('❌ Project name required');
            process.exit(1);
        }
        const aesthetic = (args.find(a => a.startsWith('--aesthetic='))?.split('=')[1] || 'cyber-neon');
        const theme = args.includes('--dark') ? 'dark' : 'light';
        const config = {
            name: projectName,
            type: 'app',
            aesthetic,
            framework: 'next',
            theme,
        };
        console.log(`🎨 Creating ${config.name} with ${config.aesthetic} aesthetic (${config.theme})...`);
        const result = await initProject(config);
        if (result.success) {
            console.log('✅ Project initialized successfully!');
            console.log(`\nNext steps:`);
            console.log(`  cd ${projectName}/my-app`);
            console.log(`  npm run dev`);
        }
        else {
            console.error(`❌ Error: ${result.error}`);
            process.exit(1);
        }
    }
    if (command === 'component') {
        console.log('🚧 Component generation coming soon...');
    }
    if (command === 'page') {
        console.log('🚧 Page generation coming soon...');
    }
}
main();
//# sourceMappingURL=index.js.map