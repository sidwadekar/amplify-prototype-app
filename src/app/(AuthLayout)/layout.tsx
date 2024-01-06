import Header from './../components/Header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <section>
      <Header/>
      {children}
    </section>
  )
}
