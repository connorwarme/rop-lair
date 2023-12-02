import ChangePost from "../components/ChangePost";

const CreatePost = () => {
  const url = "https://rings-of-power.fly.dev/createpost"
  return (
    <>
      <ChangePost url={url} post={false} currentPhoto={() => false}/>
    </>
  )
}
export default CreatePost;