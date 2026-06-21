import { useState } from 'react';
import axios from 'axios';
import { Upload, X, CheckCircle2, AlertCircle, Image } from 'lucide-react';
import API_BASE from '../api';

export default function AddPropertyForm({ onClose, onPropertyAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    descriptionEn: '',
    price: '',
    propertyType: 'HOUSE',
    purpose: 'SALE',
    areaSize: '',
    areaUnit: 'MARLA',
    bedrooms: '',
    bathrooms: '',
    location: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [uploadProgress, setUploadProgress] = useState('');

  const handleChange = (field, isNumber = false) => (e) => {
    const value = isNumber ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Compress image using Canvas API before uploading
  const compressImage = (file, maxWidthPx = 1200, quality = 0.75) => {
    return new Promise((resolve) => {
      // Skip compression for small files (< 200KB)
      if (file.size < 200 * 1024) { resolve(file); return; }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          if (width > maxWidthPx) {
            height = Math.round((height * maxWidthPx) / width);
            width = maxWidthPx;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          }, 'image/jpeg', quality);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map(f => URL.createObjectURL(f));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUploadProgress('');

    try {
      const token = localStorage.getItem('token');

      // Step 1: Create the property
      setUploadProgress('Creating listing...');
      const propRes = await axios.post(`${API_BASE}/api/v1/properties`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const propertyId = propRes.data.id;

      // Step 2: Compress all images in parallel
      if (images.length > 0) {
        setUploadProgress(`Compressing ${images.length} image(s)...`);
        const compressedImages = await Promise.all(images.map(file => compressImage(file)));

        // Step 3: Upload all images in parallel (much faster!)
        setUploadProgress(`Uploading ${compressedImages.length} image(s)...`);
        await Promise.all(
          compressedImages.map(file => {
            const imageFormData = new FormData();
            imageFormData.append('file', file);
            return axios.post(
              `${API_BASE}/api/v1/properties/${propertyId}/images`,
              imageFormData,
              { headers: { Authorization: `Bearer ${token}` } }
            );
          })
        );
      }

      setUploadProgress('Done!');
      onPropertyAdded();
      onClose();
    } catch (err) {
      console.error('Property save error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to save property. Please try again.';
      setError(msg);
      setLoading(false);
      setUploadProgress('');
    }
  };

  const inputClass = 'bg-brand-black border border-brand-gold/30 p-2.5 text-brand-white rounded w-full focus:outline-none focus:border-brand-gold transition-colors text-sm';
  const selectClass = inputClass + ' cursor-pointer';

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-dark p-6 rounded-xl border border-brand-gold/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-brand-gold/10">
        
        <div className="flex justify-between items-center mb-6 border-b border-brand-gold/20 pb-4">
          <h2 className="text-2xl font-bold text-brand-gold uppercase tracking-wider">Add New Listing</h2>
          <button onClick={onClose} className="text-brand-white/60 hover:text-brand-gold transition-colors">
            <X size={22} />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1">Title *</label>
              <input required placeholder="e.g. 5 Marla House in DHA Phase 6" className={inputClass} onChange={handleChange('title')} />
            </div>
            <div>
              <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1">Price (PKR) *</label>
              <input required placeholder="e.g. 15000000" type="number" className={inputClass} value={formData.price} onChange={handleChange('price', true)} />
            </div>
            <div>
              <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1">Location</label>
              <input placeholder="e.g. DHA Phase 6, Lahore" className={inputClass} onChange={handleChange('location')} />
            </div>
            <div>
              <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1">Property Type *</label>
              <select required className={selectClass} value={formData.propertyType} onChange={handleChange('propertyType')}>
                <option value="HOUSE">House</option>
                <option value="APARTMENT">Apartment</option>
                <option value="PLOT">Plot</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="VILLA">Villa</option>
              </select>
            </div>
            <div>
              <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1">Purpose *</label>
              <select required className={selectClass} value={formData.purpose} onChange={handleChange('purpose')}>
                <option value="SALE">For Sale</option>
                <option value="RENT">For Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1">Area Size *</label>
              <input required placeholder="e.g. 5" type="number" className={inputClass} value={formData.areaSize} onChange={handleChange('areaSize', true)} />
            </div>
            <div>
              <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1">Area Unit *</label>
              <select required className={selectClass} value={formData.areaUnit} onChange={handleChange('areaUnit')}>
                <option value="MARLA">Marla</option>
                <option value="KANAL">Kanal</option>
                <option value="SQ_FT">Square Feet</option>
                <option value="SQ_YD">Square Yards</option>
              </select>
            </div>
            <div>
              <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1">Bedrooms</label>
              <input placeholder="e.g. 4" type="number" min="0" className={inputClass} value={formData.bedrooms} onChange={handleChange('bedrooms', true)} />
            </div>
            <div>
              <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1">Bathrooms</label>
              <input placeholder="e.g. 3" type="number" min="0" className={inputClass} value={formData.bathrooms} onChange={handleChange('bathrooms', true)} />
            </div>
          </div>

          <div>
            <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1">Description *</label>
            <textarea required placeholder="Describe the property in detail..." rows="3" className={inputClass} onChange={handleChange('descriptionEn')} />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-2">
              Property Images <span className="text-brand-gold/60 normal-case">(auto-compressed for fast upload)</span>
            </label>
            <label className="block border border-dashed border-brand-gold/50 p-6 rounded-lg text-center cursor-pointer hover:border-brand-gold hover:bg-brand-black/30 transition-all">
              <Upload className="mx-auto text-brand-gold mb-2" size={28} />
              <span className="text-brand-white/80 text-sm">Click to select images</span>
              <p className="text-brand-white/40 text-xs mt-1">JPG, PNG, WEBP — any size, auto-compressed before upload</p>
              <input type="file" multiple className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>

            {/* Image Previews with file size info */}
            {imagePreviews.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img src={src} alt={`preview-${i}`} className="w-20 h-16 object-cover rounded border border-brand-gold/30" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[9px] text-brand-gold text-center py-0.5 rounded-b">
                      {(images[i]?.size / 1024).toFixed(0)}KB
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded-lg hover:bg-brand-gold-light transition-colors uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                {uploadProgress || 'Processing...'}
              </>
            ) : (
              <>
                <CheckCircle2 size={18} /> Save Listing
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
