// "use client"; // Mark this component as a Client Component

// import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import path from "path";

interface ImageGalleryProps {
	images: string[];
}

function isVideo(file: string) {
	const videoExtensions = [".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv"];

	// Get the file extension
	const ext = path.extname(file).toLowerCase();

	// Check if the extension is in the list of video extensions
	return videoExtensions.includes(ext);
}

export function ImageGallery({ images }: ImageGalleryProps) {
	return (
		<div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
			{images.map((image, index) => (
				<Link
					key={`${index}`}
					href={`${image}`}
					//   as={`/p/${id}`}
					//   ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
					shallow
					className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
				>
					{isVideo(image) ? (
						<video
							className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
							style={{ transform: "translate3d(0, 0, 0)" }}
							controls
							width={720}
							height={480}
						>
							<source src={image} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					) : (
						<Image
							alt="photo"
							className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
							style={{ transform: "translate3d(0, 0, 0)" }}
							placeholder="blur"
							blurDataURL={`${image}`}
							src={`${image}`}
							priority
							width={720}
							height={480}
							sizes="(max-width: 640px) 100vw,
							(max-width: 1280px) 50vw,
							(max-width: 1536px) 33vw,
							25vw"
						/>
					)}
				</Link>
			))}
		</div>
	);
}
