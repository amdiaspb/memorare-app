/* 
export function WorkshopReadme() {
  const [cards, setCards] = useState();
  const [readme, setReadme] = useState();
  const [text, updateText, setText] = useValue();
  const session = useGetWorkshopSession();
  const upsertSession = useUpsertWorkshopSession();
  const deckId = useRef(getUserData().workshopDeckId);

  // SECTION 1 ===================================================

  useEffect(() => {
    session.act(deckId.current);
  }, [upsertSession.data]);

  useEffect(() => {
    if (session.data) {
      setReadme(session.data.readme);
      if (!text) setText(session.data.readme);
    }
  }, [session.data]);

  function saveSession() {
    const state = {
      cards: { currentIndex: -1, stack: {} },
      ...session.data,
      currentType: "readme",
      readme: text,
    };
    upsertSession.act(deckId.current, state);
  }

  // SECTION 2 ===================================================

  return(
    <div className="edit-container">
      <Button className="preview">Preview</Button>
      <div className="editor">
        <div className="top"></div>
        <textarea className="text" value={text} onChange={updateText} spellCheck={false} autoFocus onKeyDown={handleKeyDown}/>
      </div>
      <div className="options">
        <Button onClick={saveSession}>Save</Button>
        <Button>Exit</Button>
      </div>
    </div>
  );
}
 */