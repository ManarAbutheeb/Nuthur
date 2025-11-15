"use client";
import { useEffect, useState, Suspense } from "react"; 
import { useRouter, useSearchParams } from "next/navigation";

export default function ApproveEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const [message, setMessage] = useState("activiting account....");

  useEffect(() => {
    const approveAccount = async () => {
      if (!email || !token) {
        setMessage("رابط التفعيل غير صحيح ");
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/approve-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token }),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage("account avtivated successfly");
          setTimeout(() => router.push("/log-in"), 2000);
        } else {
          setMessage((data.error || "failed to activated the account"));
        }
      } catch (err) {
        console.error(err);
        setMessage("something wronge");
      }
    };

    approveAccount();
  }, [email, token, router]);


  return (
    <div className="container py-5 text-center">
      <h2>{message}</h2>
    </div>
  );
}
export default function ApproveEmailPage() { //
  return (
    <Suspense fallback={<div className="container py-5 text-center"><h2>Loading...</h2></div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}