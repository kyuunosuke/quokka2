import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/AdminDashboard";
import { LoadingScreen } from "../ui/loading-spinner";

const AdminPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin-login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingScreen text="Loading admin panel..." />;
  }

  if (!user) {
    return null; // Will redirect to admin login
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
};

export default AdminPage;
