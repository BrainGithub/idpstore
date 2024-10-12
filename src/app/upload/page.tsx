"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function Page() {
	const [file, setFile] = useState<File | null>(null);
	const [message, setMessage] = useState<string>("");

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		setFile(selectedFile || null);
	};

	console.log("--------File:");
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		console.log("--------File:", file);
		if (!file) {
			setMessage("Please select a file.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const result = await res.json();
			if (res.ok) {
				setMessage((result as { message: string }).message);
			} else {
				setMessage("File upload failed.");
			}
		} catch (error) {
			setMessage("An error occurred.");
		}
	};

	return (
		<div>
			<h1>Upload a File</h1>
			<form onSubmit={handleSubmit}>
				<input type="file" onChange={handleFileChange} />
				<button type="submit">Upload</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
