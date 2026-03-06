"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from './page.module.scss';
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import ArrowIcon from "@/components/icons/ArrowIcon";
import PlayListIcon from "@/components/icons/PlayListIcon";
import PageIntro from "@/components/PageIntro/PageIntro";
import MusicList from "@/components/MusicList/MusicList";
import BottomPlayer from "@/components/BottomPlayer/BottomPlayer";
import { useSurveyStore } from "@/stores/useSurveyStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import MusicListSkeleton from "@/components/MusicListSkeleton/MusicListSkeleton";

export default function Result() {
  const router = useRouter();
  const result = useSurveyStore((s) => s.result);

  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const hasTrack = usePlayerStore((s) => !!s.currentTrack);

  useEffect(() => {
    async function fetchRecommendation() {
      try {
        const res = await fetch("/api/recommend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            moods: result.moods ? [result.moods] : [],
            activities: result.activities ? [result.activities] : [],
            styles: result.styles ? [result.styles] : [],
          })
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("추천 요청 실패:", text);
          return;
        }
        
        const data = await res.json(); 

        setTracks(data || []);        
      } catch (err) {
        console.error("추천 요청 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendation();
  }, [result, router]);

  return (
    <section className={styles.wrap}>
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
        style={{
          paddingBottom: hasTrack ? "calc(4rem + env(safe-area-inset-bottom))" : "0",
          transition: "padding 0.3s ease",
        }}
      >
        {
          loading ? 
          <>
            <PageIntro 
              title="당신을 위한 음악을 찾는 중..."
            />
            <MusicListSkeleton />
          </>
          :
          <>
            <PageIntro 
              title="오늘 같은 순간엔, 이런 음악이 잘 어울려요"
            />
            <MusicList songs={tracks} />
            <BottomPlayer /> 
          </>            
        }
      </motion.section>
    </section>
  )
}