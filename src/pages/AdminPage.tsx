import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase, BUCKET, WORKS_BUCKET, getPublicUrl, getWorksUrl } from '../lib/supabase';
import {
  Upload, Trash2, LogOut, ImagePlus, Loader2,
  CheckCircle2, AlertCircle, Home, Images, FolderOpen, Pencil, Check, X,
  ChevronLeft, ChevronRight, Plus,
} from 'lucide-react';

interface KatalogImage { name: string; url: string; }
interface WorkImage { id: string; image_url: string; sort_order: number; }
interface Work {
  id: string;
  title: string;
  description: string;
  title_uz?: string | null;
  title_ru?: string | null;
  description_uz?: string | null;
  description_ru?: string | null;
  image_url: string | null;
  work_images?: WorkImage[];
}
function getWorkDisplayImages(w: Work): { id?: string; image_url: string }[] {
  if (w.work_images?.length) {
    const sorted = [...w.work_images].sort((a, b) => a.sort_order - b.sort_order);
    return sorted.map(i => ({ id: i.id, image_url: i.image_url }));
  }
  if (w.image_url) return [{ image_url: w.image_url }];
  return [];
}
function getFirstImageUrl(w: Work): string | null {
  const imgs = getWorkDisplayImages(w);
  return imgs.length ? imgs[0].image_url : null;
}

// ──────────────────────────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────────────────────────
const useToast = () => {
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const show = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };
  return { toast, show };
};

// ──────────────────────────────────────────────────────────────────
// KATALOG TAB
// ──────────────────────────────────────────────────────────────────
const KatalogTab = ({ showToast }: { showToast: (m: string, ok: boolean) => void }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages]       = useState<KatalogImage[]>([]);
  const [loading, setLoading]     = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting]   = useState<string | null>(null);
  const [dragOver, setDragOver]   = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from(BUCKET).list('', {
      sortBy: { column: 'created_at', order: 'desc' },
    });
    if (error) showToast(t('admin.uploadError', { msg: error.message }), false);
    else setImages((data ?? []).filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f.name))
      .map(f => ({ name: f.name, url: getPublicUrl(f.name) })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const uploadFiles = async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!arr.length) return;
    setUploading(true);
    let ok = 0;
    for (const file of arr) {
      const ext  = file.name.split('.').pop();
      const name = `photo_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from(BUCKET).upload(name, file, {
        cacheControl: '3600', upsert: true, contentType: file.type,
      });
      if (error) console.error('Upload error:', JSON.stringify(error));
      else ok++;
    }
    setUploading(false);
    showToast(t('admin.imagesUploaded', { count: ok }), true);
    load();
  };

  const del = async (name: string) => {
    if (!confirm(t('admin.confirmDeleteName', { name }))) return;
    setDeleting(name);
    const { error } = await supabase.storage.from(BUCKET).remove([name]);
    setDeleting(null);
    if (error) showToast(t('admin.deleteError'), false);
    else { showToast(t('admin.deleted'), true); load(); }
  };

  return (
    <div>
      {/* Upload area */}
      <div className="mb-8">
        <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-[#F2B33D] mb-2">{t('admin.uploadImages')}</h3>
        <div className="h-0.5 w-12 bg-[#F2B33D] mb-5" />
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); uploadFiles(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-sm p-10 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-[#F2B33D] bg-[#F2B33D]/5' : 'border-[#A6AFBF]/25 hover:border-[#F2B33D]/50 hover:bg-[#14171C]'
          }`}
        >
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
            onChange={e => e.target.files && uploadFiles(e.target.files)} />
          {uploading
            ? <div className="flex flex-col items-center gap-3"><Loader2 size={36} className="text-[#F2B33D] animate-spin" /><p className="text-[#A6AFBF]">{t('admin.uploading')}</p></div>
            : <div className="flex flex-col items-center gap-3">
                <ImagePlus size={40} className="text-[#A6AFBF]" />
                <p className="text-[#F4F6FA] font-medium">{t('admin.dragHere')}</p>
                <p className="text-sm text-[#A6AFBF]">{t('admin.orClickMultiple')}</p>
              </div>
          }
        </div>
      </div>

      {/* Grid */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-[#F2B33D]">{t('admin.catalogCount', { count: images.length })}</h3>
      </div>
      {loading
        ? <div className="flex justify-center py-12"><Loader2 size={32} className="text-[#F2B33D] animate-spin" /></div>
        : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {images.map(img => (
              <div key={img.name} className="group relative aspect-square bg-[#14171C] rounded-sm overflow-hidden">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                  <button onClick={() => del(img.name)} disabled={deleting === img.name}
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center">
                    {deleting === img.name ? <Loader2 size={18} className="animate-spin text-white" /> : <Trash2 size={18} className="text-white" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────
// WORKS TAB
// ──────────────────────────────────────────────────────────────────
const WorksTab = ({ showToast }: { showToast: (m: string, ok: boolean) => void }) => {
  const { t, i18n } = useTranslation();
  const getDisplayTitle = (w: Work) => (i18n.language === 'ru' && w.title_ru) ? w.title_ru : (w.title_uz || w.title || '');
  const getDisplayDesc = (w: Work) => (i18n.language === 'ru' && w.description_ru) ? w.description_ru : (w.description_uz || w.description || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const appendImagesRef = useRef(false);
  const [works, setWorks]         = useState<Work[]>([]);
  const [loading, setLoading]     = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting]   = useState<string | null>(null);
  const [saving, setSaving]       = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitleUz, setEditTitleUz] = useState('');
  const [editTitleRu, setEditTitleRu] = useState('');
  const [editDescUz, setEditDescUz]   = useState('');
  const [editDescRu, setEditDescRu]   = useState('');
  const [form, setForm]           = useState({ title_uz: '', title_ru: '', description_uz: '', description_ru: '' });

  const load = async () => {
    setLoading(true);
    const { data: worksData, error: worksErr } = await supabase
      .from('works')
      .select('*')
      .order('created_at', { ascending: false });
    if (worksErr) {
      showToast(t('admin.loadError'), false);
      setLoading(false);
      return;
    }
    const worksList = (worksData ?? []) as Work[];
    if (worksList.length > 0) {
      const { data: imagesData, error: imagesErr } = await supabase
        .from('work_images')
        .select('id, work_id, image_url, sort_order')
        .in('work_id', worksList.map(w => w.id));
      if (!imagesErr && imagesData?.length) {
        const byWorkId = imagesData.reduce<Record<string, WorkImage[]>>((acc, img) => {
          const row = img as { work_id: string; id: string; image_url: string; sort_order: number };
          if (!acc[row.work_id]) acc[row.work_id] = [];
          acc[row.work_id].push({ id: row.id, image_url: row.image_url, sort_order: row.sort_order });
          return acc;
        }, {});
        worksList.forEach(w => { w.work_images = byWorkId[w.id] ?? []; });
      } else {
        worksList.forEach(w => { w.work_images = []; });
      }
    }
    setWorks(worksList);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const pickFiles = (fileList: FileList | File[], append = false) => {
    const arr = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!arr.length) return;
    if (append) {
      setFiles(prev => [...prev, ...arr]);
      setPreviews(prev => [...prev, ...arr.map(f => URL.createObjectURL(f))]);
    } else {
      setFiles(arr);
      setPreviews(arr.map(f => URL.createObjectURL(f)));
    }
  };

  const removeFormImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const moveFormImage = (index: number, dir: number) => {
    const next = index + dir;
    if (next < 0 || next >= files.length) return;
    setFiles(prev => {
      const a = [...prev];
      [a[index], a[next]] = [a[next], a[index]];
      return a;
    });
    setPreviews(prev => {
      const a = [...prev];
      [a[index], a[next]] = [a[next], a[index]];
      return a;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.length || !form.title_uz.trim()) return;
    setUploading(true);

    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop();
      const name = `work_${Date.now()}_${i}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from(WORKS_BUCKET).upload(name, file, {
        cacheControl: '3600', upsert: true, contentType: file.type,
      });
      if (uploadErr) {
        showToast(t('admin.uploadImageError', { msg: uploadErr.message }), false);
        setUploading(false);
        return;
      }
      uploadedUrls.push(getWorksUrl(name));
    }

    const firstUrl = uploadedUrls[0];
    // Supabase jadval tiplari loyihada generate qilinmagan, shuning uchun type assertion
    const { data: newWork, error: dbErr } = await (supabase.from('works') as any).insert({
      title: form.title_uz.trim(),
      description: form.description_uz.trim() || null,
      title_uz: form.title_uz.trim() || null,
      title_ru: form.title_ru.trim() || null,
      description_uz: form.description_uz.trim() || null,
      description_ru: form.description_ru.trim() || null,
      image_url: firstUrl,
    }).select('id').single();

    if (dbErr || !newWork) {
      showToast(t('admin.dbError'), false);
      setUploading(false);
      return;
    }

    if (uploadedUrls.length > 0) {
      const { error: imgErr } = await (supabase.from('work_images') as any).insert(
        uploadedUrls.map((image_url, sort_order) => ({ work_id: (newWork as { id: string }).id, image_url, sort_order }))
      );
      if (imgErr) showToast(t('admin.imagesDbError'), false);
    }

    showToast(t('admin.workAdded'), true);
    setForm({ title_uz: '', title_ru: '', description_uz: '', description_ru: '' });
    setFiles([]);
    setPreviews([]);
    load();
    setUploading(false);
  };

  const del = async (work: Work) => {
    const displayTitle = work.title_uz || work.title_ru || work.title;
    if (!confirm(t('admin.confirmDeleteWork', { title: displayTitle }))) return;
    setDeleting(work.id);
    const images = getWorkDisplayImages(work);
    const names = [...new Set(images.map(i => i.image_url.split('/').pop()).filter(Boolean))] as string[];
    if (names.length) await supabase.storage.from(WORKS_BUCKET).remove(names);
    await supabase.from('work_images').delete().eq('work_id', work.id);
    const { error } = await supabase.from('works').delete().eq('id', work.id);
    setDeleting(null);
    if (error) showToast(t('admin.deleteError'), false);
    else { showToast(t('admin.deleted'), true); load(); }
  };

  const [addingImagesWorkId, setAddingImagesWorkId] = useState<string | null>(null);
  const addImagesInputRef = useRef<HTMLInputElement>(null);
  const [addingImagesLoading, setAddingImagesLoading] = useState(false);

  const addImagesToWork = async (workId: string, fileList: FileList | null) => {
    if (!fileList?.length) return;
    const arr = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!arr.length) return;
    setAddingImagesWorkId(workId);
    setAddingImagesLoading(true);
    const work = works.find(w => w.id === workId);
    const startOrder = work?.work_images?.length ?? 0;
    for (let i = 0; i < arr.length; i++) {
      const file = arr[i];
      const ext = file.name.split('.').pop();
      const name = `work_${workId.slice(0, 8)}_${Date.now()}_${i}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from(WORKS_BUCKET).upload(name, file, {
        cacheControl: '3600', upsert: true, contentType: file.type,
      });
      if (uploadErr) continue;
      await (supabase.from('work_images') as any).insert({
        work_id: workId,
        image_url: getWorksUrl(name),
        sort_order: startOrder + i,
      });
    }
    setAddingImagesLoading(false);
    setAddingImagesWorkId(null);
    showToast(t('admin.imagesAdded'), true);
    load();
  };

  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);
  const delWorkImage = async (_workId: string, imageId: string, imageUrl: string) => {
    if (!confirm(t('admin.confirmDeleteImage'))) return;
    setDeletingImageId(imageId);
    const fileName = imageUrl.split('/').pop() ?? '';
    await supabase.storage.from(WORKS_BUCKET).remove([fileName]);
    await supabase.from('work_images').delete().eq('id', imageId);
    setDeletingImageId(null);
    showToast(t('admin.imageDeleted'), true);
    load();
  };

  const startEdit = (w: Work) => {
    setEditingId(w.id);
    setEditTitleUz(w.title_uz ?? w.title ?? '');
    setEditTitleRu(w.title_ru ?? '');
    setEditDescUz(w.description_uz ?? w.description ?? '');
    setEditDescRu(w.description_ru ?? '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitleUz('');
    setEditTitleRu('');
    setEditDescUz('');
    setEditDescRu('');
  };

  const saveEdit = async () => {
    if (!editingId || !editTitleUz.trim()) return;
    setSaving(editingId);
    const { data, error } = await (supabase.from('works') as any).update({
      title: editTitleUz.trim(),
      description: editDescUz.trim() || null,
      title_uz: editTitleUz.trim() || null,
      title_ru: editTitleRu.trim() || null,
      description_uz: editDescUz.trim() || null,
      description_ru: editDescRu.trim() || null,
    }).eq('id', editingId).select('id, title, title_uz, title_ru, description, description_uz, description_ru, image_url').single();
    setSaving(null);
    if (error) {
      showToast(t('admin.saveError', { msg: error.message }), false);
      return;
    }
    showToast(t('admin.saved'), true);
    const row = data as { title_uz?: string; title_ru?: string; description_uz?: string; description_ru?: string } | null;
    if (row) {
      setWorks(prev => prev.map(w => w.id === editingId ? {
        ...w,
        title: editTitleUz.trim(),
        description: editDescUz.trim() || '',
        title_uz: row.title_uz ?? undefined,
        title_ru: row.title_ru ?? undefined,
        description_uz: row.description_uz ?? undefined,
        description_ru: row.description_ru ?? undefined,
      } : w));
    }
    cancelEdit();
    load();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Add form */}
      <div>
        <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-[#F2B33D] mb-2">{t('admin.addWork')}</h3>
        <div className="h-0.5 w-12 bg-[#F2B33D] mb-5" />
        <form onSubmit={handleSubmit} className="bg-[#14171C] border border-[#A6AFBF]/15 rounded-sm p-6 space-y-4">
          {/* Image picker — bir nechta rasm, tartiblash, yana qo'shish */}
          <div
            className={`border-2 border-dashed rounded-sm transition-colors overflow-hidden ${
              previews.length ? 'border-[#F2B33D]/50' : 'border-[#A6AFBF]/25 hover:border-[#F2B33D]/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => {
                if (e.target.files?.length) pickFiles(e.target.files, appendImagesRef.current);
                e.target.value = '';
              }}
            />
            {previews.length ? (
              <div className="flex items-stretch gap-3 p-3 min-h-[100px]">
                <div className="flex gap-2 flex-wrap flex-1 min-w-0">
                  {previews.map((url, i) => (
                    <div key={i} className="relative group flex flex-col items-center">
                      <img src={url} alt="" className="w-20 h-20 object-cover rounded-sm border border-[#A6AFBF]/20" />
                      <p className="text-[10px] text-[#A6AFBF] mt-1">{i === 0 ? t('admin.first') : `${i + 1}`}</p>
                      <div className="flex items-center gap-0.5 mt-1">
                        <button
                          type="button"
                          onClick={() => moveFormImage(i, -1)}
                          disabled={i === 0}
                          className="p-1 rounded bg-[#0B0C0F] text-[#A6AFBF] hover:text-[#F2B33D] disabled:opacity-30 disabled:cursor-not-allowed"
                          title={t('admin.moveLeft')}
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveFormImage(i, 1)}
                          disabled={i === previews.length - 1}
                          className="p-1 rounded bg-[#0B0C0F] text-[#A6AFBF] hover:text-[#F2B33D] disabled:opacity-30 disabled:cursor-not-allowed"
                          title={t('admin.moveRight')}
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFormImage(i)}
                        className="absolute top-0 right-0 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title={t('admin.remove')}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center border-l border-[#A6AFBF]/20 pl-3">
                  <button
                    type="button"
                    onClick={() => { appendImagesRef.current = true; fileInputRef.current?.click(); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#F2B33D]/15 text-[#F2B33D] hover:bg-[#F2B33D]/25 text-sm font-medium transition-colors"
                  >
                    <Plus size={18} /> {t('admin.addMore')}
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => { appendImagesRef.current = false; fileInputRef.current?.click(); }}
                className="flex flex-col items-center gap-2 py-8 text-[#A6AFBF] cursor-pointer"
              >
                <Upload size={32} />
                <p className="text-sm">{t('admin.selectImages')}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs text-[#A6AFBF] mb-1.5 uppercase tracking-wide">{t('admin.titleUz')}</label>
            <input type="text" required value={form.title_uz}
              onChange={e => setForm({ ...form, title_uz: e.target.value })}
              placeholder={t('admin.titlePlaceholder')}
              className="w-full px-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/40 text-sm" />
          </div>

          <div>
            <label className="block text-xs text-[#A6AFBF] mb-1.5 uppercase tracking-wide">{t('admin.titleRu')}</label>
            <input type="text" value={form.title_ru}
              onChange={e => setForm({ ...form, title_ru: e.target.value })}
              placeholder={t('admin.titlePlaceholder')}
              className="w-full px-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/40 text-sm" />
          </div>

          <div>
            <label className="block text-xs text-[#A6AFBF] mb-1.5 uppercase tracking-wide">{t('admin.descriptionUz')}</label>
            <input type="text" value={form.description_uz}
              onChange={e => setForm({ ...form, description_uz: e.target.value })}
              placeholder={t('admin.descriptionPlaceholder')}
              className="w-full px-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/40 text-sm" />
          </div>

          <div>
            <label className="block text-xs text-[#A6AFBF] mb-1.5 uppercase tracking-wide">{t('admin.descriptionRu')}</label>
            <input type="text" value={form.description_ru}
              onChange={e => setForm({ ...form, description_ru: e.target.value })}
              placeholder={t('admin.descriptionPlaceholder')}
              className="w-full px-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/40 text-sm" />
          </div>

          <button type="submit" disabled={uploading || !files.length || !form.title_uz.trim()}
            className="btn-primary w-full py-3 rounded-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50">
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImagePlus size={18} />}
            {uploading ? t('admin.saving') : t('admin.add')}
          </button>
        </form>
      </div>

      {/* Works list */}
      <div>
        <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-[#F2B33D] mb-2">{t('admin.worksCount', { count: works.length })}</h3>
        <div className="h-0.5 w-12 bg-[#F2B33D] mb-5" />
        {loading
          ? <div className="flex justify-center py-12"><Loader2 size={32} className="text-[#F2B33D] animate-spin" /></div>
          : works.length === 0
            ? <div className="text-center py-12 text-[#A6AFBF]"><Images size={40} className="mx-auto mb-3 opacity-30" /><p>{t('admin.noWorksYet')}</p></div>
            : <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                <input ref={addImagesInputRef} type="file" accept="image/*" multiple className="hidden"
                  onChange={e => { const wid = addingImagesWorkId; if (wid) addImagesToWork(wid, e.target.files); e.target.value = ''; }} />
                {works.map(w => (
                  <div key={w.id} className="bg-[#14171C] border border-[#A6AFBF]/15 rounded-sm p-3 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-sm flex-shrink-0 overflow-hidden bg-[#0B0C0F]">
                        {getFirstImageUrl(w) ? (
                          <img src={getFirstImageUrl(w)!} alt={getDisplayTitle(w)} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#A6AFBF]/50"><Images size={20} /></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        {editingId === w.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editTitleUz}
                              onChange={e => setEditTitleUz(e.target.value)}
                              placeholder={t('admin.titleUz')}
                              className="w-full px-3 py-2 rounded-sm text-sm text-[#F4F6FA] bg-[#0B0C0F] border border-[#A6AFBF]/30 focus:border-[#F2B33D] outline-none"
                              autoFocus
                            />
                            <input
                              type="text"
                              value={editTitleRu}
                              onChange={e => setEditTitleRu(e.target.value)}
                              placeholder={t('admin.titleRu')}
                              className="w-full px-3 py-2 rounded-sm text-sm text-[#F4F6FA] bg-[#0B0C0F] border border-[#A6AFBF]/30 focus:border-[#F2B33D] outline-none"
                            />
                            <input
                              type="text"
                              value={editDescUz}
                              onChange={e => setEditDescUz(e.target.value)}
                              placeholder={t('admin.descriptionUz')}
                              className="w-full px-3 py-2 rounded-sm text-xs text-[#A6AFBF] bg-[#0B0C0F] border border-[#A6AFBF]/30 focus:border-[#F2B33D] outline-none"
                            />
                            <input
                              type="text"
                              value={editDescRu}
                              onChange={e => setEditDescRu(e.target.value)}
                              placeholder={t('admin.descriptionRu')}
                              className="w-full px-3 py-2 rounded-sm text-xs text-[#A6AFBF] bg-[#0B0C0F] border border-[#A6AFBF]/30 focus:border-[#F2B33D] outline-none"
                            />
                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={saveEdit}
                                disabled={saving === w.id || !editTitleUz.trim()}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#F2B33D] text-[#0B0C0F] text-xs font-medium hover:opacity-90 disabled:opacity-50"
                              >
                                {saving === w.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                                {t('admin.save')}
                              </button>
                              <button
                                onClick={cancelEdit}
                                disabled={saving === w.id}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#A6AFBF]/20 text-[#A6AFBF] text-xs hover:bg-[#A6AFBF]/30 disabled:opacity-50"
                              >
                                <X size={12} /> {t('admin.cancel')}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="font-medium text-[#F4F6FA] text-sm truncate">{getDisplayTitle(w)}</p>
                            <p className="text-xs text-[#A6AFBF] truncate">{getDisplayDesc(w) || '—'}</p>
                          </>
                        )}
                      </div>
                      {editingId !== w.id && (
                        <>
                          <button
                            type="button"
                            onClick={() => { setAddingImagesWorkId(w.id); addImagesInputRef.current?.click(); }}
                            disabled={addingImagesLoading}
                            className="w-9 h-9 bg-[#A6AFBF]/15 hover:bg-[#F2B33D]/20 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors text-[#A6AFBF] hover:text-[#F2B33D]"
                            title={t('admin.addImage')}
                          >
                            {addingImagesWorkId === w.id && addingImagesLoading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                          </button>
                          <button
                            onClick={() => startEdit(w)}
                            className="w-9 h-9 bg-[#A6AFBF]/15 hover:bg-[#F2B33D]/20 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors text-[#A6AFBF] hover:text-[#F2B33D]"
                            title={t('admin.edit')}
                          >
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => del(w)} disabled={deleting === w.id}
                            className="w-9 h-9 bg-red-900/40 hover:bg-red-600 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors">
                            {deleting === w.id ? <Loader2 size={16} className="animate-spin text-white" /> : <Trash2 size={16} className="text-red-400 hover:text-white" />}
                          </button>
                        </>
                      )}
                    </div>
                    {/* Ish rasmlari ro'yxati (o'chirish uchun) */}
                    {editingId !== w.id && (w.work_images?.length ?? 0) > 0 && (
                      <div className="flex gap-2 flex-wrap pl-0">
                        {w.work_images!.map(img => (
                          <div key={img.id} className="relative group">
                            <img src={img.image_url} alt="" className="w-12 h-12 object-cover rounded-sm" />
                            <button
                              type="button"
                              onClick={() => delWorkImage(w.id, img.id, img.image_url)}
                              disabled={deletingImageId === img.id}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs"
                            >
                              {deletingImageId === img.id ? <Loader2 size={10} className="animate-spin" /> : '×'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
        }
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────
// MAIN ADMIN PAGE
// ──────────────────────────────────────────────────────────────────
const AdminPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'katalog' | 'works'>('katalog');
  const { toast, show: showToast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin/login');
    });
  }, [navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0B0C0F] text-[#F4F6FA]">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-sm shadow-lg text-sm font-medium ${
          toast.ok ? 'bg-green-900/90 text-green-300' : 'bg-red-900/90 text-red-300'
        }`}>
          {toast.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-[#14171C] border-b border-[#A6AFBF]/15 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.webp" alt="" className="h-9 w-9 rounded-full" />
          <div>
            <p className="font-mono text-sm font-bold text-[#F4F6FA] tracking-wider">{t('common.brand')}</p>
            <p className="text-xs text-[#A6AFBF]">{t('login.adminPanel')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-[#A6AFBF]/30 rounded-sm p-0.5 mr-2">
            <button
              type="button"
              onClick={() => i18n.changeLanguage('uz')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${i18n.language === 'uz' ? 'text-[#F2B33D] bg-[#F2B33D]/15' : 'text-[#A6AFBF] hover:text-[#F4F6FA]'}`}
            >
              UZB
            </button>
            <button
              type="button"
              onClick={() => i18n.changeLanguage('ru')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${i18n.language === 'ru' ? 'text-[#F2B33D] bg-[#F2B33D]/15' : 'text-[#A6AFBF] hover:text-[#F4F6FA]'}`}
            >
              RUS
            </button>
          </div>
          <a href="/" className="flex items-center gap-2 text-sm text-[#A6AFBF] hover:text-[#F4F6FA] transition-colors px-3 py-2">
            <Home size={16} /> {t('admin.site')}
          </a>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-[#A6AFBF] hover:text-red-400 transition-colors px-3 py-2">
            <LogOut size={16} /> {t('admin.logout')}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#14171C] border-b border-[#A6AFBF]/15 px-6">
        <div className="flex gap-1">
          {([
            { key: 'katalog', labelKey: 'nav.katalog', icon: FolderOpen },
            { key: 'works', labelKey: 'admin.worksTab', icon: Images },
          ] as const).map(({ key, labelKey, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                tab === key
                  ? 'border-[#F2B33D] text-[#F2B33D]'
                  : 'border-transparent text-[#A6AFBF] hover:text-[#F4F6FA]'
              }`}
            >
              <Icon size={16} /> {t(labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        {tab === 'katalog' ? <KatalogTab showToast={showToast} /> : <WorksTab showToast={showToast} />}
      </main>
    </div>
  );
};

export default AdminPage;
