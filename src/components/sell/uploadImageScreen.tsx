'use client';
import React from "react";

export interface UploadedFiles {
  rc: File | null;
  exterior: File[];
  tyres: File[];
  interior: File[];
}

interface UploadImagesScreenProps {
  uploadedFiles: UploadedFiles;
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFiles>>;
  onUpload?: () => void;
}

const inputBase =
  "block w-full text-sm text-white bg-black/10 border border-[#D4AF37]/30 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#D4AF37]/80 file:to-[#BFA980]/80 file:text-black hover:file:bg-[#D4AF37] transition";

function pluralize(count: number, word: string) {
  return count === 1 ? word : word + "s";
}

const UploadedImagePreview: React.FC<{
  files: File[];
  onRemove: (idx: number) => void;
}> = ({ files, onRemove }) => (
  <div className="flex flex-wrap gap-3 mt-2">
    {files.map((file, idx) => (
      <div
        key={idx}
        className="relative w-16 h-16 bg-gray-700 rounded-lg overflow-hidden border border-[#BFA980]/50"
      >
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="object-cover w-full h-full"
        />
        <button
          type="button"
          onClick={() => onRemove(idx)}
          className="absolute -top-2 -right-2 bg-[#D4AF37] text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg hover:bg-[#BFA980] ring-2 ring-black ring-inset"
          title="Remove"
        >
          ×
        </button>
      </div>
    ))}
  </div>
);

const UploadImagesScreen: React.FC<UploadImagesScreenProps> = ({
  uploadedFiles,
  setUploadedFiles,
  onUpload,
}) => (
  <div className="w-full min-h-[400px] flex flex-col justify-center items-center">
    <div className="bg-black/80 p-8 rounded-2xl border border-[#D4AF37]/30 text-center shadow-xl max-w-lg mx-auto w-full">
      <h2 className="text-2xl font-extrabold text-[#D4AF37] mb-2 font-heading drop-shadow">
        🎉 Request Submitted!
      </h2>
      <p className="text-white mb-4 leading-relaxed">
        Your request has been submitted. <br />
        A dedicated person will contact you with your car's current price.
      </p>
      <div className="rounded-lg bg-[#222]/60 border border-[#D4AF37]/10 p-3 mb-6 shadow-md">
        <p className="text-[#D4AF37] font-bold mb-1">
          For a more accurate price...
        </p>
        <ul className="text-sm text-gray-200 space-y-1">
          <li>
            <span className="text-[#D4AF37] mr-1">•</span>
            <span className="font-semibold">RC:</span> 1 clear image
          </li>
          <li>
            <span className="text-[#D4AF37] mr-1">•</span>
            <span className="font-semibold">Exterior, Tyres, Interior:</span>{" "}
            Multiple clear images each (optional)
          </li>
        </ul>
      </div>
      <form
        className="space-y-6 text-left"
        onSubmit={e => {
          e.preventDefault();
          if (onUpload) onUpload();
          else alert("Images uploaded! (backend to be connected)");
        }}
      >
        {/* RC Image Upload */}
        <div>
          <label className="block text-[#D4AF37] font-semibold text-sm mb-1">
            RC (Registration Certificate) image{" "}
            <span className="text-xs text-gray-400 font-normal">({uploadedFiles.rc ? "1 selected" : "No file selected"})</span>
          </label>
          <div className="rounded-lg border-2 border-dashed border-[#BFA980]/50 bg-[#23221e]/50 p-3">
            <input
              type="file"
              accept="image/*"
              onChange={e =>
                setUploadedFiles((f) => ({
                  ...f,
                  rc: e.target.files?.[0] ?? null,
                }))
              }
              className={inputBase}
            />
            <div className="text-xs text-gray-400 mt-1">
              Only 1 image is allowed. Upload a clear picture of the original RC.
            </div>
            {uploadedFiles.rc && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={URL.createObjectURL(uploadedFiles.rc)}
                  alt="RC Preview"
                  className="rounded h-16 w-28 object-cover border border-[#D4AF37]/30 shadow-lg"
                />
                <button
                  className="ml-2 py-1 px-2 bg-[#D4AF37] text-black rounded text-xs font-semibold"
                  type="button"
                  onClick={() => setUploadedFiles((f) => ({ ...f, rc: null }))}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* EXTERIOR IMAGES */}
        <div>
          <label className="block text-[#D4AF37] font-semibold text-sm mb-1">
            Car Exterior Images{" "}
            <span className="text-xs text-gray-400 font-normal">
              ({uploadedFiles.exterior.length} {pluralize(uploadedFiles.exterior.length, "selected")})
            </span>
          </label>
          <div className="rounded-lg border-2 border-dashed border-[#BFA980]/50 bg-[#23221e]/50 p-3">
            <input
              multiple
              type="file"
              accept="image/*"
              onChange={e => {
                const files = Array.from(e.target.files || []);
                setUploadedFiles((f) => ({
                  ...f,
                  exterior: files,
                }));
              }}
              className={inputBase}
            />
            <div className="text-xs text-gray-400 mt-1">
              You may upload multiple clear images of the car’s exterior from different angles.
            </div>
            {uploadedFiles.exterior.length > 0 && (
              <UploadedImagePreview
                files={uploadedFiles.exterior}
                onRemove={idx =>
                  setUploadedFiles((f) => ({
                    ...f,
                    exterior: f.exterior.filter((_, i) => i !== idx),
                  }))
                }
              />
            )}
          </div>
        </div>

        {/* TYRES IMAGES */}
        <div>
          <label className="block text-[#D4AF37] font-semibold text-sm mb-1">
            Tyres Images{" "}
            <span className="text-xs text-gray-400 font-normal">
              ({uploadedFiles.tyres.length} {pluralize(uploadedFiles.tyres.length, "selected")})
            </span>
          </label>
          <div className="rounded-lg border-2 border-dashed border-[#BFA980]/50 bg-[#23221e]/50 p-3">
            <input
              multiple
              type="file"
              accept="image/*"
              onChange={e => {
                const files = Array.from(e.target.files || []);
                setUploadedFiles((f) => ({
                  ...f,
                  tyres: files,
                }));
              }}
              className={inputBase}
            />
            <div className="text-xs text-gray-400 mt-1">
              Upload multiple images if you want, showing close-up condition of each tyre.
            </div>
            {uploadedFiles.tyres.length > 0 && (
              <UploadedImagePreview
                files={uploadedFiles.tyres}
                onRemove={idx =>
                  setUploadedFiles((f) => ({
                    ...f,
                    tyres: f.tyres.filter((_, i) => i !== idx),
                  }))
                }
              />
            )}
          </div>
        </div>

        {/* INTERIOR IMAGES */}
        <div>
          <label className="block text-[#D4AF37] font-semibold text-sm mb-1">
            Interior Images{" "}
            <span className="text-xs text-gray-400 font-normal">
              ({uploadedFiles.interior.length} {pluralize(uploadedFiles.interior.length, "selected")})
            </span>
          </label>
          <div className="rounded-lg border-2 border-dashed border-[#BFA980]/50 bg-[#23221e]/50 p-3">
            <input
              multiple
              type="file"
              accept="image/*"
              onChange={e => {
                const files = Array.from(e.target.files || []);
                setUploadedFiles((f) => ({
                  ...f,
                  interior: files,
                }));
              }}
              className={inputBase}
            />
            <div className="text-xs text-gray-400 mt-1">
              You may upload interior images to show seat and dashboard condition.
            </div>
            {uploadedFiles.interior.length > 0 && (
              <UploadedImagePreview
                files={uploadedFiles.interior}
                onRemove={idx =>
                  setUploadedFiles((f) => ({
                    ...f,
                    interior: f.interior.filter((_, i) => i !== idx),
                  }))
                }
              />
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-3 mt-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-lg font-bold text-lg text-black shadow-lg hover:brightness-105 active:scale-98 transition"
        >
          Submit Images
        </button>
      </form>
      <div className="text-xs mt-6 text-center text-gray-400">
        <span className="font-bold text-[#D4AF37]">Skip this step if you wish.</span><br />
        We'll still reach out to you soon.
      </div>
    </div>
  </div>
);

export default UploadImagesScreen;
