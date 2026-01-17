"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RotatingTextProps {
	phrases: string[]
	interval?: number
}

export default function RotatingText({ phrases, interval = 3000 }: RotatingTextProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
		}, interval)

		return () => clearInterval(timer)
	}, [phrases.length, interval])

	return (
		<div className="h-8 md:h-10 flex items-center justify-center">
			<AnimatePresence mode="wait">
				<motion.p
					key={currentIndex}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
					className="text-xl md:text-2xl text-muted-foreground"
				>
					{phrases[currentIndex]}
				</motion.p>
			</AnimatePresence>
		</div>
	)
}
