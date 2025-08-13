import HeroUploadForm from '@/app/components/heroUploadForm';
import AdminCardGrid from '@/app/components/admin/adminCarGrid';

export default function AdminHeroPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <HeroUploadForm />
      <AdminCardGrid />
    </main>
  );
}
