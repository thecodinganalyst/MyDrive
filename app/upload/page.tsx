"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async () => {
    if (!file) return;

    const res = await fetch("/api/s3/upload", {
      method: "POST",
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
      headers: { "Content-Type": "application/json" },
    });
    const { url } = await res.json();

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    alert("Uploaded!");
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}