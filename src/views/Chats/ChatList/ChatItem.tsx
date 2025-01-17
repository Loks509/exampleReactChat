interface ChatItemProps {
    itemChat: string
}

export default function ChatItem(props: ChatItemProps) {
    return (
        <>
            {props.itemChat}
            Item
        </>
    )
}