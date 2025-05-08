import "./marquee.css";

type Props = {
  list: { name: string; url: string }[];
};

export function Marquee({ list }: Props) {
  return (
    <div className="marquee">
      <div className="marquee-text">
        <div className="marquee-text-track">
          {list.concat(list).map(({ name, url }) => (
            <>
              <p className="marquee-btn">{name}</p>
              <p
                className="marquee-btn marquee-btn__img"
                style={{ background: `url('${url}')` }}
              ></p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
