import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { useValue } from "../../hooks/useValue";
import { getUserData } from "../../utils/helper";
import { BasePage } from "../BasePage";
import { useGetCardsByDeckId, useGetStudySession, usePatchStudySession } from "../../services/generalApi";
import dayjs from "dayjs";

export function StudiesSession() {
  const [session, setSession] = useState();
  const [state, setState] = useState();
  const [content, setContent] = useState();
  const [done, setDone] = useState(false);
  const [card, setCard] = useState();
  const [show, setShow] = useState(false);
  
  const [text, updateText, setText] = useValue();
  const cards = useGetCardsByDeckId(); // get deckSnapshot (=== cards)
  const getSession = useGetStudySession();
  const patchSession = usePatchStudySession();
  const studyId = useRef(getUserData().sessionStudyId);

  // SECTION 1 ===================================================

  // GET
  useEffect(() => {
    getSession.act(studyId.current);
    cards.act(1); // get deckSnapshot (=== cards)
  }, []);

  // FORMAT
  useEffect(() => {
    if (getSession.data && !session) {
      const { id, state, content, intervals } = getSession.data;
      setState(JSON.parse(state));

      const parsedContent = JSON.parse(content);
      const review =  parsedContent.review;
      for (let i = 0; i < review.length; i++) {
        review[i].date = dayjs(review[i].date);
      }
      const study =  parsedContent.study;
      for (let i = 0; i < study.length; i++) {
        study[i].date = dayjs(study[i].date);
      }
      setContent(parsedContent); // get today reviews

      setSession({ id, intervals });
    }
  }, [getSession.data]);

  // DEBUG
  useEffect(() => {
    if (cards.data) console.log("CARDS:", cards.data);
  }, [cards.data]);

  useEffect(() => {
    if (content) {
      console.log("CONTENT:", content);
      decideNextCard();
    }
  }, [content]);

  useEffect(() => {
    if (state) console.log("STATE:", state);
  }, [state]);

  // SECTION 2 ===================================================

  function decideNextCard() {
    const { cards, study, review } = content;
    const now = dayjs();
    
    if (review.length && state.today[2] > 0) {
      const card = review[0];
      const multipliers = [0.5, 2, 3];
      const intervals = multipliers.map(m => Math.floor(card.interval * m));
      const isDue = dayjs(card.date).isBefore(now);
      if (isDue) {
        return updateCard("review", card.index, resolveReviewCard, intervals);
      }
    }

    if (study.length) {
      const card = study[0];
      const isDue = dayjs(card.date).isBefore(now);
      if (isDue || state.today[0] === 0) {
        return updateCard("study", card.index, resolveStudyCard, session.intervals);
      }
    }

    if (cards.length && state.today[0] > 0) {
      return updateCard("card", cards[0], resolveNewCard, [1, ...session.intervals]);
    }

    setCard(null);
    setDone(true);
  }

  function resolveNewCard(time) {
    const dayInMinutes = 1440;
    const key = (time < dayInMinutes) ? "study" : "review";
    const card = {
      index: content.cards[0],
      interval: time,
      date: dayjs().add(time, "minutes")
    }

    const obj = { [key]:[...content[key]] };
    obj[key].push(card);
    obj[key].sort((a, b) => a.date - b.date);
    obj.cards = content.cards.slice(1); // without first

    const newState = calculateState(0, key === "study" ? 1 : 2);
    const newContent = {...content, ...obj};
    setContent(newContent);
    return updateSession(newState, newContent);
  }

  function resolveStudyCard(time) {
    const { study } = content;
    study[0].interval = time;
    study[0].date = dayjs().add(time, "minutes");
    
    const dayInMinutes = 1440;
    if (time < dayInMinutes) {
      study.sort((a, b) => a.date - b.date);
      const newContent = {...content, ...{ study }};
      setContent(newContent);
      return updateSession(state, newContent);
    }
  
    const { review } = content;
    review.push(study.shift());
    review.sort((a, b) => a.date - b.date);
    
    const newState = calculateState(1, 2);
    const newContent = {...content, ...{ study, review }};
    setContent(newContent);
    updateSession(newState, newContent);
  }

  function resolveReviewCard(time) {
    const { review } = content;
    review[0].interval = time;
    review[0].date = dayjs().add(time, "minutes");

    const dayInMinutes = 1440;
    if (time > dayInMinutes) {
      review.sort((a, b) => a.date - b.date);
      const newState = calculateState(2);
      const newContent = {...content, ...{ review }};
      setContent(newContent);
      updateSession(newState, newContent);
      return;
    }
  
    const { study } = content;
    study.push(review.shift());
    study.sort((a, b) => a.date - b.date);
    
    const newState = calculateState(2, 1);
    const newContent = {...content, ...{ study, review }};
    setContent(newContent);
    updateSession(newState, newContent);
  }

  function handleAnswer(option) {
    const intervals = [1, ...session.intervals];

    switch (card.type) {
      case "card": card.resolve(intervals[option]); break;
      case "study": card.resolve(intervals[option+1]); break;
      case "review": 
        const multipliers = [0.5, 2, 3];
        card.resolve(card.intervals[option] * multipliers[option]);
      break;
    };
    setShow(false);
  }


  function formatTime(time) {
    if (time < 60) return time + "m";
    if (time < 1440) return time/60 + "h";
    return time/60/24 + "d";
  }

  function calculateState(a, b) {
    const { today, total } = state;

    today[a]--;
    if (b === 1) today[b]++;
    if (b) { total[a]--; total[b]++; };

    const newState = {...state, ...{ total, today }};
    setState(newState);
    return newState;
  }

  function updateCard(type, index, resolve, intervals) {
    setCard({ type, index, resolve, intervals });
  }

  function updateSession(state, content) {
    patchSession.act(studyId.current, { state, content });
  }

  // SECTION 3 ===================================================

  return(
    <BasePage>
      <StudiesSessionStyle>
        <div className="card">
          <div className="front">
            <div className="footnote">
              #{(card && cards.data) && cards.data[card.index].id}
            </div>
            <div className="text">
              {(card && cards.data) && cards.data[card.index].front}
            </div>
          </div>
          {show && <div className="back">
            <hr/>
            <div className="text">
              {(card && cards.data) && cards.data[card.index].back}
            </div>
          </div>}
        </div>
        <div className="options">
          {(card && show) ? <>
            <Button onClick={() => handleAnswer(0)}>Hard ~ {card.intervals && formatTime(card.intervals[0])}</Button>
            <Button onClick={() => handleAnswer(1)}>Good ~ {card.intervals && formatTime(card.intervals[1])}</Button>
            <Button onClick={() => handleAnswer(2)}>Easy ~ {card.intervals && formatTime(card.intervals[2])}</Button>
            <Button onClick={() => setShow(false)}>Hide</Button>
          </> : <Button onClick={() => setShow(true)}>Show</Button>}
        </div>
      </StudiesSessionStyle>
    </BasePage>
  );
}

const StudiesSessionStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .card {
    width: 100%;
    text-align: center;

    .text {
      font-size: 40px;
    }

    .footnote {
      text-align: left;
      font-size: 24px;
      color: ${props => props.theme.border};
      font-weight: 800;
      margin-left: 64px;
    }

    .front {
      margin-top: 128px;
    }

    .back {
      width: 100%;
      margin-top: 64px;
      display: flex;
      flex-direction: column;
      align-items: center;

      hr {
        width: 80%;
        border: 0;
        border-top: 1px solid ${props => props.theme.border};
      }

      .text {
        margin-top: 64px;
      }
    }
  }

  .options {
    position: absolute;
    bottom: 80px;
    display: flex;
    align-self: center;
    gap: 8px;
  }

`;
