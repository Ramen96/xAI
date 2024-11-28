import { Fragment } from "react/jsx-runtime";
import styles from "~/styles/chat-bubbles.module.css";

const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

export default function ChatBubbles() {
  return arr.map(element => 
    <Fragment key={element}>
      <div className={styles.messageRight}>
        <div className={styles.bubbleWrapperUser}>
          <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, dignissimos dolores placeat optio quos repellat blanditiis fuga porro tenetur natus? Doloribus incidunt nobis deserunt ipsum, dolore animi earum aperiam tempora.</p>
        </div>
      </div>
    </Fragment>
  )
}