type buttonTypo = {
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'dark-tertiary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'gradient'
    | 'themeLightShade'
    | 'disabled';
  varient?: 'solid' | 'faded' | 'bordered' | 'light' | 'flat';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'w-100';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: any;
  clickHandler?: any;
  customClass?:string;
};

const Button = ({
  children,
  color,
  varient,
  size,
  radius,
  type,
  clickHandler,
  customClass
}: buttonTypo) => {
  const btnClr = color !== undefined ? color : 'default';
  const btnVarient = varient !== undefined ? varient : 'solid';
  const btnSize = size !== undefined ? size : 'sm';
  const btnRadius = radius !== undefined ? radius : 'sm';
  return (
    <>
      <button
        type={type ? type : 'button'}
        onClick={clickHandler}
        className={`u-button ${btnClr} ${btnVarient} size-${btnSize} radius-${btnRadius} ${customClass != "" && customClass != undefined ? customClass : ''}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
