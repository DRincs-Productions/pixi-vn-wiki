# How implement Speed text or Typewriter effect?

In a visual novel, it is very useful to have a typewriter effect.

For implement this effect, you can use the following code:

```tsx
import { useEffect, useState } from 'react';

export default function Typewriter({ text, delay = 30 }: {
    text: string;
    delay?: number;
}) {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    useEffect(() => {
        setCurrentText('');
        setCurrentIndex(0);
    }, [text]);

    return <span>{currentText}</span>;
};
```

::: sandbox {template=8lns2x previewHeight=200 entry=%2Fsrc%2Fcomponents%2FTypewriter.tsx}
:::

You can achieve the same result using the library [Framer Motion](https://www.framer.com/motion/):

```tsx
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Typewriter({ text, delay = 30 }: {
    text: string;
    delay?: number;
}) {
    const sentenceVariants = {
        hidden: {},
        visible: { opacity: 1, transition: { staggerChildren: delay / 1000 } },
    };
    const letterVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
    }), [delay]);

    return (
        <motion.p
            key={text}
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
        >
            {text.split("").map((char, i) => (
                <motion.span key={`${char}-${i}`} variants={letterVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.p>
    )
};
```

::: sandbox {template=73dkhh previewHeight=200 entry=%2Fsrc%2Fcomponents%2FTypewriter.tsx}
:::
