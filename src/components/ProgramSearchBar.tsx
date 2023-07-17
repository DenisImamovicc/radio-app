
function ProgramSearchBar() {

  const handleUserInput = (e:any) => {
    console.log(e.nativeEvent.data,e.target.value);
    
  };

  return (
    <>
      <input
        type="text"
        placeholder="Sök program"
        onInput={handleUserInput}
      ></input>
    </>
  );
}

export default ProgramSearchBar;
