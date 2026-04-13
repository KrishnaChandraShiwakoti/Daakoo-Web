import { Outlet } from "react-router-dom";
import StaffSidebar from "../../components/StaffSidebar";
import StaffTopbar from "../../components/StaffTopbar";
import { useStaffOrders } from "../../hooks/useStaffOrders";
import { LIVE_STATUSES } from "../../utils/orderHelpers";
import "../../styles/staff.css";
import { useEffect, useMemo } from "react";

const HomeLayout = () => {
  const { orders, fetchOrders } = useStaffOrders();

  useEffect(() => {
    fetchOrders({ limit: 200 }).catch(() => {});
  }, [fetchOrders]);

  const activeLiveCount = useMemo(
    () => orders.filter((order) => LIVE_STATUSES.includes(order.status)).length,
    [orders],
  );

  return (
    <div className="staff-shell">
      <StaffSidebar activeLiveCount={activeLiveCount} />
      <main className="staff-main">
        <StaffTopbar />
        <section className="staff-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default HomeLayout;
