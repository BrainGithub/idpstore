import { IncomingMessage } from "http";
import { NextRequest, NextResponse } from "next/server";
import * as formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable Next.js built-in body parser
// export const runtime = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

// Helper function to parse the form data
const parseForm = async (
	req: IncomingMessage,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
	const uploadsDir = path.join(process.cwd(), "/public/uploads");
	console.dir(req)
	console.log("Creating uploads directory---------------------");
	// Ensure the uploads directory exists
	if (!fs.existsSync(uploadsDir)) {
		console.warn("Creating uploads directory");
		fs.mkdirSync(uploadsDir, { recursive: true });
	}

	const form = new formidable.IncomingForm({
		uploadDir: uploadsDir, // Set the upload directory via options
		keepExtensions: true, // Keep file extensions via options
	});

	console.dir(form);

	return new Promise((resolve, reject) => {
		console.log("in Promise---------------------");
		form.parse(req, (err, fields, files) => {
			console.log("fields------", fields);
  			console.log("files------", files);
			console.log("in Promise parse---------------------");
			if (err) {
				console.error("Error parsing form data:", err);
				reject(err);
			}

			resolve({ fields, files });
		});
	});
};

export async function POST(req: NextRequest) {
	console.log("Request method:------------------", req.method);
	if (req.method === "POST") {
		try {
			const incomingReq = req as unknown as IncomingMessage;
			const { files } = await parseForm(incomingReq);
			console.log("------files", files);
			const file = Array.isArray(files) ? (files[0] as File) : undefined;

			if (!file) {
				// Response.status(400).json({ error: "No file uploaded" });
				return new Response("No file uploaded!", {
					status: 400,
				});
			}

			// Move or rename the file if needed
			// const newFilePath = path.join(process.cwd(), `/public/uploads/${file.originalFilename}`);
			// fs.renameSync(file.filepath, newFilePath);

			return NextResponse.json({ message: "File uploaded successfully!" }, { status: 200 });
		} catch (e) {
			// const errorMessage = e instanceof Error ? e.message : "Unknown error";

			console.error("Error:", e);
			return NextResponse.json({ error: "File upload failed:" }, { status: 500 });
		}
	} 
	
	return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

