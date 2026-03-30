const ICON_COUNT = 34;

const ICON_SYMBOLS = ['🍽️', '🥄', '🍴', '🍜', '🥢', '🥗', '🍕', '🍔', '🍣', '🌮', '🥙', '🍝'];

const ICON_VARIANTS = ['food-icon--warm', 'food-icon--soft', 'food-icon--dim'];

const floatingIcons = Array.from({ length: ICON_COUNT }, (_, index) => {
  const laneWidth = 92 / ICON_COUNT;
  const baseLeft = 4 + laneWidth * index;
  const laneJitter = ((index * 19) % 9) - 4;
  const left = Math.min(96, Math.max(3, baseLeft + laneJitter * 0.35));
  const direction = index % 2 === 0 ? 1 : -1;
  const drift = direction * (14 + (index % 8) * 3);

  return {
    symbol: ICON_SYMBOLS[index % ICON_SYMBOLS.length],
    variant: ICON_VARIANTS[index % ICON_VARIANTS.length],
    left: `${left.toFixed(2)}%`,
    delay: `-${5 + index * 1.4}s`,
    duration: `${18 + (index % 10) * 1.2}s`,
    drift: `${drift}px`,
    scale: (0.74 + (index % 7) * 0.055).toFixed(2),
  };
});

export default function FloatingFoodIcons() {
  return (
    <div className="floating-food-icons" aria-hidden="true">
      {floatingIcons.map((icon, index) => (
        <span
          key={`${icon.symbol}-${index}`}
          className={`food-icon ${icon.variant}`}
          style={{
            '--left': icon.left,
            '--delay': icon.delay,
            '--duration': icon.duration,
            '--drift': icon.drift,
            '--scale': icon.scale,
          }}
        >
          {icon.symbol}
        </span>
      ))}
    </div>
  );
}
