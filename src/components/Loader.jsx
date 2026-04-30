export default function Loader() {
  return (
    <div style={wrap}>
      <div style={spinner}></div>
    </div>
  );
}

const wrap = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "40vh",
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #eee",
  borderTop: "4px solid maroon",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};
