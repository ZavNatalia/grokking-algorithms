export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="h-full p-10 max-w-5xl mx-auto">{children}</section>
    );
}
