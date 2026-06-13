import Header from '@/components/header'
import './globals.css'
import { Inter, Playfair_Display, JetBrains_Mono, Caveat } from 'next/font/google'
import ActiveSectionContextProvider from '@/context/active-section-context'
import ThemeContextProvider from '@/context/theme-context'
import CaseFileContextProvider from '@/context/case-file-context'
import SmoothScroll from '@/components/smooth-scroll'
import Footer from '@/components/footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-handwriting' })

export const metadata = {
  title: 'The Curious Case of Prem Singh | Portfolio',
  description: 'Law Student, Developer, and Experimental Thinker. Building things beyond the syllabus.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="!scroll-smooth case-file">
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${caveat.variable} font-sans bg-gray-50 
      text-gray-950 relative
      pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 min-h-screen transition-colors duration-300`}>
        <div className='bg-[#fbe2e3] absolute top-[-6rem] -z-10
        right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full 
        blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263] transition-opacity duration-500 dec-glow'></div>
        <div className='bg-[#dbd7fb] absolute top-[-1rem] -z-10
        left-[-35rem] h-[31.25rem] w-[50rem] rounded-full 
        blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] 
        xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394] transition-opacity duration-500 dec-glow'></div>

        <ThemeContextProvider>
          <CaseFileContextProvider>
            <ActiveSectionContextProvider>
              <SmoothScroll>
                <Header />
                {children}
                <Footer />

                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    className: "font-mono text-xs border border-[#cbd2c0] dark:border-[#3a2f26] bg-[#fdfcf7] dark:bg-[#1e1b19] text-[#1f1a16] dark:text-[#ebdcd0] rounded-lg shadow-md",
                    duration: 5000,
                  }}
                />
              </SmoothScroll>
            </ActiveSectionContextProvider>
          </CaseFileContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
