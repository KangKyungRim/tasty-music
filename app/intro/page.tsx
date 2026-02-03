'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./page.module.scss";
import LogoIcon from "@/components/icons/LogoIcon";

export default function IntroPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/"); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <section className={styles.intro}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.logo}>
          <LogoIcon size={64}/>
          <h1>TASTY MUSIC</h1>
          <p>내 입맛에 딱 맞춘 음악</p>
        </div>
      </motion.div>
    </section>
  );
}