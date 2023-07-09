
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <title>Chatter|Dashboard-Analytics</title>
        <meta name='description' content="" />
      </head>

      {children}

    </>
  )
}