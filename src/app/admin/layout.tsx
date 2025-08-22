import AppWrapper from "@/components/admin/appwrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AppWrapper>{children}</AppWrapper>;
}
