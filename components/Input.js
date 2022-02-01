import { useRef, useState } from "react";

import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";

const Input = () => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);

  const addImageToPost = () => {
    // const reader = new FileReader();
    // if (e.target.files[0]) {
    //   reader.readAsDataURL(e.target.files[0]);
    // }
    // reader.onload = (readerEvent) => {
    //   setSelectedFile(readerEvent.target.result);
    // };
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const sendPost = () => {};

  return (
    <div
      className={
        "border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll"
      }
    >
      <img
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QAqRXhpZgAASUkqAAgAAAABADEBAgAHAAAAGgAAAAAAAABHb29nbGUAAP/bAIQAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHEAgMDhAMFA0LCxUODxEYEBAPEwsQEBMRDxQQEQ4QEhAQEBESEA0PDgEDBAQGBQYKBgYKDg4KDQ0QEA4QERAODxAQDw8QDw8QDhIODxAQEA0ODw0PDQ8ODw8NDxAQEg0NEA0PDQ0ODQ8N/8AAEQgAPAA8AwERAAIRAQMRAf/EABwAAAEEAwEAAAAAAAAAAAAAAAUGBwgJAgMEAf/EADkQAAEDAgQFAgMHAQkBAAAAAAECAwQFEQAGEiEHEyIxQQhRMnGBFBVCUmGRoeEWIzNiY4KxwfAJ/8QAGwEAAgIDAQAAAAAAAAAAAAAABAUDBgECBwD/xAAxEQABBAAEAwYGAQUAAAAAAAABAAIDEQQSITEFQWETUYGxwfAicZGh0fEyBhQWUqL/2gAMAwEAAhEDEQA/AJ8ZpzLDoVLStOiaq5AbbO1rgG6rEeRgmKVr5Ozv4j78Esla1rLO3RRi41UmsZonwBlmSzDlPu6upaFIR5uoG3SkG5FvH0KzicEvaNIG/Xu+fRW7g+IjMBAN5frqmWz3nGj8P6lRKdXc1zqg3SmGjPjBKS244g3Ty9NhyydlCxV3CvhuApTkaLNmveyPEoafi2XDMi5nqeY8vy5VLkOU2pMx6tJqUN7kDqVs0FBIUU6EhWk9KwSDqupKpM5aAX6ilGWmV9NGnuk5HBWVCzdQqvQafU2HkrrMqsoEd1LYCXFKUGSLGwQAhNxfUOsHfEQPa/CNrv8AaMheIvi57d6UvGCZlmh0SNJzOEzfsYDLVNhrLjYWdjrUR8Rva5HYbDxgfEytBrcqWMGi7l15+CZ/hdS6zxfpkms/f8KmNU8qjR2EQEPrAF1XWpXQDY9KdFkgXubqJE0eCTup2Pc6iNvBNHVMgZirlYqD8CBIzoUvFEipxoiJaebYHQXVI3KQU309H5dt8DsAqm6qWSEk2SPFTffzPU6JwIpUyfRZ9Qq1OpzS5ghqQlZSgIUogk3JWkGyU6jfaw2xYcGJWYmJ7mkDMBWY0c1t2HU2Vz7HMDoZAO4m9OVH05BIfKWc65nqZOo9XyXmGkUiQyt5uoyIq0BLgGrZZQBdSdSVb+6e5viy8dLDhxI3drqOoutRtd93zCA/prM3FGN105umjqvQ7kAd46EKN3qL4F5n4cVRmrKaek0M6QmXGAWps/lX2276SdrbEjpxz0TOByvXRMRhg8Z49QPf0QCs5/qNMyvlx5FUlrkcp1tKFOa1adIQLd+3R52SbC9rDUYgyGu5STxCBrXjmPNBeBmf65kbiA0iJKWkSUJjSBHaDx5dja1yBYXuT/OPTTuibnadUBgInPm7Mj5j3sl1xbybmGY81V6vm5dQy+i7rAlPthXMAN9KddrlP5So7W22Aia8OaHk7pniYDnpxoAbJ8YNTcyp6dMpzKdCalwJbP2aWhpCL8vVpBBuQSbBKvGoC6CNsIP8hYZ3YWqc336pnhcK0c70Fa96F0fjxUqPSosWhUGDSqchA0x3lrWu/kqKS2Lnuem5O5JvjLuKyX8LW11spyzh0ThmkLrPdopNVOmuuZRnQIrQigxVsMhPYXBAN7Hz7/1w2ixMseNMksjnltONdwN0Gj0C5U7CukhMTBuKH0PNAsq56EvPEimU+mu/ZYNkS5L6kpTzrJ2QNVz0qB1gWNiL3GOiydpiGRSMFxyDU7FoN18Jog3rRCruGc2OR8brEjNgNi4VeosVXXyW3jDS6rmnIM9qmcuRHkRFNuxlsEufqQNSCfe1wTta/bHPMU58b3xijlJrr4rp/D3MdWewT4j5UofI4P5hzrOCXaRHiUltB/v1NqY3QLX5XVb2tq+HvvhGyR4YXRg2NT+1apIA54bLlrl6aWfNaKTwNqNKzC/Jfp8Soxk7NtrkOsote91WKlEHe41AHsb+An40vGU+N0f0imcLa12ax3DcV+flopMI9ONJ4y8NGqXWHmqe7C08h+HpZ0kg9KUWI02ttY28WvfB0LMQ6LPAASDzdXMXsHE0NtKuhzttU4tOyKcR1ba/R+qy4G8H8/8ACqj/ANmZjlKq1GjPvrj1IynWXghZvbQEqBAVc/GNjpI2uZ8FwZ8vEG8RczIWjUONAmiLFb6bgmilk2Kj7DsrJJIqhZock8znD3JNSVzX8v0eW6NlLc0Om/e19/JJt+uLcOH4LvZ90AMZjho0PA5JLZgzEhmlfaVqVGKklC1faltpASQdgCDv5vpuOxIw6wPBmwOdI+iXakVWv1KTzN/uY+zcSB0JB0N7ggjrqmvkcXIMlhbbdVYbsslQjhDVyPJKlE37b6t/Pth0ZA0AA7eCmhw7YxoPfqhjHqbp+X6m7DqBUA8myr7jbp5qDuDYWCwDcBIKRsdVQ4lhWuJkj/kb05eCdYeZrHND9lsgcf8ALcJ6pNOIqFRckkRwuC1zW0kG5J3F73Tukk9tt8UvByvhZKJBq4Vvt4dVeJIe3dH2AzBp1oHz6JOP8TqdSHZtVdo1RhUVklDsuStsBQAKgUp1ki56RcatxqA8JTCZZGhlffvTXETugiJmBBGo27t0B4P+u4Q0SYGZaQyxDDq3m5kN5SXla1fDyykp6E6QCXE9IA3Nyen4bADsGsY6iORJAJ57fhclkxwklL3tBtTEycmm8W8rw6/RKo3PpMgnQ+hRJ1A2KVDuFA3BB3Hy7qnYfEFxYWVR5m/Ia/VGN4i2H+I9Eq4eQYsSMhpsadN9R09zfv8AtYfTGRgphs+vAeqDl4nJI7Nari9QHHt+oppcOkrWhmosvFb5cH+IhwosBb2AP+4YvONxmRwYOYOvVB58uiYukV1U5gMyQZAXci6t7+QfkbfQ4UNlzjVbsk0QvMNUgNKSzDEttba+ahRkFaAe/wABBHe3ax+e2AcQ5oNC7UMjgdkQyzxhqeWYJhiMzIaJUVd29z527EH2t3+WEmIwzZtdnd6ecN47PgdG6j50uHM/E2t5wiIiTHtMVIA5SCQjxsBc7X379/OMYfBxwuzNu1pxHjWIx4qTbn1QSFbYDubC+H8BBSJqmh/82eJU+l8S6zkVbi1UmqwV1FpGvYSWtCdh/nQVXP8Appxu8nPopntGSzuPI/j1VjjaNY3FreTjZrXOQlKiTMbT8nmraS49EjOPO8wC6Q2pYQkk9rEBAHvgae3HNyF/c6KY2dVy0iSjU4y+stawVJd7dX9f+cZhdehWWHkhakXWrz88CubqtCF5ytQ1Y8I1il5o0+f5x4tpeRehUt2pOkoWhltKrcxwKIva9hYKPb9P+sSMkDE94fwifGMdMygwODbN6uOtAAEmhqTVCxZsgKRXo4SnLfq0yrHln7O42ZMZwE/iWyUAfVZAHvicyNc9hG1/lDzQlmePmB5EK14BxXxNpUfcA9sH6ncD7pNpyVETOZageHs+gpeT92feTElSfxFZQsWJ/KNCSBbZVz5wsEruyMfKx5H7aIgH4SEDbIUkHxjDdl4Dmsika9OPFuqyQvUpvYWxIFjKsHUi1yfpiN4WlJWZFeKZERv8C1hKgD5uon+NP/gLLpXa175Lr/8ATb3f2LQHENBN1/tchP8Az2Z6jW/hXUxneTlLi87WoxCJNLqiCykdI1R3BYH9Lpt8jgkO9/dc5mnBxcl7Fxb6H6K7yjyxXKRBqLSeW1MjtyEoWCFALAVYj64ftaXAG0hcKJCoLYUrkvNhRCFKSopHa4vb9rn98I2bFSt5hbE7AfPBDdlIlJnCCyxBoT6E2cfhNqcPuQkDBE4FNPRTuGjT0QBJufniELULQ+LHET1qVMT08ekzJnE7hLkPMtTmVmNMqv3iqexEkthhfJlOMpBSptZACEgHQU3uSbnsHiQBRA1oa+/UKxcOxcmHjcxurHVbSLaTyNb2LNG+dGxoml9VPB6h8G+J7UKhPTXY09Cpam5rqV6VE9kEJSbdz1En9bWGN4nbFJ8VCI5LBOuvL0VonpiW5N9PuQ3JLy5DwpbbZdctqIRdAv8AJIA+mH8TBl8T50l+J0kPh9wCv//Z"
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="2"
            placeholder="What's happening?"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg  placeholder-gray-500 tracking-wide w-full min-h-[50px]   "
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="h-5 text-white" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center ">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className="h-[22px] text-[#1d9bf0]  " />
              <input
                type="file"
                hidden
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>
            <div className="icon rotate-90">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            {showEmojis && (
              <Picker
                onSelect={addEmoji}
                style={{
                  position: "absolute",
                  marginTop: "465px",
                  marginLeft: -40,
                  maxWidth: "320px",
                  borderRadius: "20px",
                }}
                theme="dark"
              />
            )}
          </div>
          <button
            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!input.trim() && !selectedFile}
            onClick={sendPost}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;