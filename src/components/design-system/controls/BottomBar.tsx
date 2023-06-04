export const BottomBar = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}) => {
  return (
    <div>
      <h1>BottomBar</h1>
      <div>{children}</div>
    </div>
  );
};

export default BottomBar;
