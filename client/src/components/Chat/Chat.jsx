import React, { useState } from 'react'

import { ChatEngine, getOrCreateChat } from 'react-chat-engine'

const Chat = () => {
	const [username, setUsername] = useState('')

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	// function renderChatForm(creds) {
	// 	return (
	// 		<div>
	// 			<input 
	// 				placeholder='Username' 
	// 				value={username} 
	// 				onChange={(e) => setUsername(e.target.value)} 
	// 			/>
	// 			<button onClick={() => createDirectChat(creds)}>
	// 				Create
	// 			</button>
	// 		</div>
	// 	)
	// }

	return (
		<ChatEngine
			height='100vh'
			userName='Saurabh'
			userSecret='pasi'
			projectID='92f84a2a-478b-4fe1-96e0-77724c7d7c02'
			// renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
	)
}

export default Chat;