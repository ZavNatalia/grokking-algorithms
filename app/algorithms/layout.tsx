export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return <section className='p-10 max-w-6xl mx-auto'>
        {children}
    </section>
}