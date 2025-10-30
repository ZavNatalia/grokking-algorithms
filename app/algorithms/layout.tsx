export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return <section className='p-10'>
        {children}
    </section>
}