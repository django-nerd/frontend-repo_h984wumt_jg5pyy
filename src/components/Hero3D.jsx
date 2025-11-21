import Spline from '@splinetool/react-spline'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero3D() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.4])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15])

  return (
    <section className="relative h-[120vh] md:h-[140vh] w-full overflow-hidden">
      <motion.div style={{ opacity, scale }} className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black via-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-white text-5xl md:text-7xl font-semibold tracking-tight drop-shadow-[0_0_60px_rgba(169,107,255,0.4)]">
            Arcyn Find
          </h1>
          <p className="mt-4 text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Discover the future of AI—instantly. Minimal. Intelligent. Beyond.
          </p>
        </div>
      </div>
    </section>
  )
}
