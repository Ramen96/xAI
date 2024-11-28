import { Fragment } from "react/jsx-runtime";
import styles from "~/styles/chat-bubbles.module.css";

interface chatBubblesProps {
  messages: object,
}

export default function ChatBubbles({ messages }: chatBubblesProps ) {

  return Object.values(messages).map(element =>
      element.role === "user" ?
        <Fragment key={element.id}>
          <div className={styles.messageRight}>
            <div className={styles.bubbleWrapperUser}>
              <p className={styles.text}>{element.message}</p>
            </div>
          </div>
        </Fragment>
      :
      <Fragment key={element.id}>
          <div className={styles.messageLeft}>
            <div className={styles.bubbleWrapperSystem}>
              <p className={styles.text}>{element.message}</p>
            </div>
          </div>
      </Fragment>
  )
}
