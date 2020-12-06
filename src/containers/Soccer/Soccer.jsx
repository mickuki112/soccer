import React, { useEffect, useRef, useState } from "react";
import data from "../../common/data";
import styles from "./Soccer.module.css";
import Slider from "@material-ui/core/Slider";

import Pause from "@material-ui/icons/Pause";
import PlayArrow from "@material-ui/icons/PlayArrow";

const Soccer = () => {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState([
    1,
    data.player_positions.length - 1,
  ]);
  const [iconPlay, setIconPlay] = useState(2);
  const width = window.innerWidth - 200;
  const height = window.innerHeight - 200;
  const sizePlayer = 20;
  let positionOld = true;
  let animationStart = false;

  useEffect(() => {
    if (iconPlay === 2) {
      init(position);
    } else if (!iconPlay) {
      requestAnimationFrame(() => {
        // eslint-disable-next-line
        animationStart = true;
        animation(position[0], position[1]);
      });
    }
  }, [iconPlay]);

  const init = (position) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    const positionOldObject = {};

    data.player_positions[position[0] - 1].map((val, i) => {
      positionOldObject[val[position[0] - 1]] = val;
      return player(ctx, val);
    });
    positionOld = positionOldObject;
  };

  const start = () => {
    setIconPlay(false);
  };

  const pause = () => {
    animationStart = false;
    setIconPlay(true);
  };

  const player = (ctx, val) => {
    const x = val[1] * width;
    const y = (1 - val[2]) * height;

    ctx.beginPath();
    ctx.arc(x, y, sizePlayer, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#fff";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#003300";
    ctx.font = "24px Arial";
    if (val[0] < 10) ctx.fillText(val[0], x - 6, y + 8);
    else ctx.fillText(val[0], x - 13, y + 8);
    ctx.stroke();
  };

  const animation = (positionPlayer, positionEnd) => {
    if (animationStart) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let newPosition = {};
      ctx.clearRect(0, 0, width, height);

      data.player_positions[positionPlayer].map((val) => {
        newPosition[val[0]] = val;
        return player(ctx, val);
      });

      ctx.restore();
      Object.keys(positionOld).map((val) => {
        if (!newPosition[positionOld[val][0]]) {
          newPosition[positionOld[val][0]] = positionOld[val];
          player(ctx, positionOld[val]);
        }
        return null;
      });
      positionOld = { ...newPosition };

      if (positionPlayer < positionEnd) {
        requestAnimationFrame(() =>
          animation(+positionPlayer + 1, position[1])
        );
      } else {
        setPosition([positionPlayer, positionEnd]);
      }
    } else {
      setPosition([positionPlayer, positionEnd]);
    }
  };

  const slider = (_, val) => {
    pause();
    setPosition(val);
    init(val);
  };

  return (
    <div className={styles.containerNavigation}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={width}
        height={height}
      />
      <div className={styles.container}>
        <div className={styles.slider}>
          <Slider
            value={position}
            onChange={slider}
            aria-labelledby="range-slider"
            step={1}
            marks
            min={1}
            max={data.player_positions.length - 1}
          />
        </div>
        {iconPlay ? (
          <PlayArrow className={styles.icon} fontSize="large" onClick={start} />
        ) : (
          <Pause className={styles.icon} fontSize="large" onClick={pause} />
        )}
      </div>
    </div>
  );
};

export default Soccer;
