import Image from "next/image"

export default function DogLogo({ className }: { className?: string }) {
	return (
		<div className={className}>
			<Image
				src="/logo.png"
				alt="Logo"
				width={40}
				height={40}
				className="w-full h-full object-contain"
			/>
		</div>
	);
}
