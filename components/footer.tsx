import { Link } from "@heroui/link";
import { siteConfig } from "@/config/site";

export function Footer() {
    return (
        <footer className="relative border-t border-white/5 py-12 px-4">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <span className="text-primary font-bold text-[10px] font-pixel">
                            D5
                        </span>
                    </div>
                    <span className="text-sm text-default-400 font-pixel">
                        Decentrathon <span className="font-sans">5.0</span>
                    </span>
                </div>

                <div className="flex items-center gap-6 text-sm text-default-500">
                    {siteConfig.navItems.map((item) => (
                        <a
                            key={item.href}
                            className="hover:text-primary transition-colors font-pixel"
                            href={item.href}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        isExternal
                        className="text-sm text-default-400 hover:text-primary transition-colors"
                        href={siteConfig.links.telegram}
                    >
                        Telegram
                    </Link>
                    <span className="text-xs text-default-300">
                        © {new Date().getFullYear()}
                    </span>
                </div>
            </div>
        </footer>
    );
}
