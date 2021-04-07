import {useState} from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import "./addToPlaylistPopup.css";

export const AddToPlaylistPopup = () => {
	const [selectedPlaylists, setSelectedPlaylists] = useState([]);
	return <div className="container-addToPlaylist">
		<div className="header">
			<div>Save video to...</div>
			<button className="btn-addNewPlaylist"><span className="icon icon-plus"><FiPlus/></span> NEW PLAYLIST</button>
		</div>
		<div className="container-playlists">
			<div className="playlist"><input type="checkbox" onChange={(e) => console.log(e.target.checked)}/>Valo</div>
			<div>yaya</div>
		</div>
		<div className="footer">
			<button className="btn-done"><span className="icon icon-check"><FiCheck/></span>Done</button>
		</div>
	</div>
}