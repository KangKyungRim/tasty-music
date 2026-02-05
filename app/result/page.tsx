"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from './page.module.scss';
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import ArrowIcon from "@/components/icons/ArrowIcon";
import PlayListIcon from "@/components/icons/PlayListIcon";
import PageIntro from "@/components/PageIntro/PageIntro";
import MusicList from "@/components/MusicList/MusicList";

const songs = [
  { title: "ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ", artist: "블랙핑크" },
  { title: "뛰어!", artist: "블랙핑크" },
];

export default function Result() {
  const router = useRouter();

  return (
    <>
      <HeaderBar>
        <HeaderBar.Left
          onClick={
            () => {
              router.replace("/survey");
            }}
        >
          <ArrowIcon 
            size={12}
          />
          <p>상태 고르기</p>
        </HeaderBar.Left>
        <HeaderBar.Right>
          <PlayListIcon
            size={18}
            color="#A8A3F7"
          />
        </HeaderBar.Right>
      </HeaderBar>

      <motion.section
        className={styles.result}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <PageIntro 
          title="오늘 같은 순간엔, 이런 음악이 잘 어울려요"
        />

        <MusicList songs={songs} />
      </motion.section>
    </>
  )
}