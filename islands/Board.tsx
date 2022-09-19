import { Component } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { fetchCors } from '../shared/fetch.ts';
import { state } from '../shared/store.ts';

interface Post {
  message: string;
  createdAt: Date;
  name: string;
}
export type Posts = Post[] | null;

export default class Board extends Component<{ posts: Posts }> {
  div: HTMLDivElement | undefined | null;
  text: HTMLTextAreaElement | undefined | null;

  scroll = () => {
    setTimeout(() => {
      window.scroll({ top: this.div?.clientHeight, behavior: 'smooth' });
    }, 300);
  }

  cnvPosts = (posts: { message: string; createdAt: string; name: string; }[]) =>
    posts.map(post => ({ ...post, createdAt: new Date(post.createdAt) }));

  // deno-lint-ignore no-explicit-any
  fetchPost = async (method: string, body: any = undefined) => {
    try {
      this.props = { posts: this.cnvPosts(await fetchCors('post', method, body)) };
      this.scroll();
    } catch (_e) {
      location.href = '/signin';
    }
  }

  onSend = async () => {
    const body = {
      message: this.text?.value,
    }
    await this.fetchPost('post', body);
    this.text!.value = '';
  }

  componentDidMount() {
    if (IS_BROWSER)
      this.scroll();
  }

  render = () => {
    const d = state.value.isSignIn;

    return (
      <div ref={el => this.div = el} >
        <h2>Board</h2>
        <div>
          {this.props.posts?.map(post => <Message post={post} />)}
        </div>
        <div class='bottom'>
          <div>
            <textarea ref={el => this.text = el} disabled={!d}></textarea>
          </div>
          <button onClick={this.onSend} disabled={!d}>Send</button>
        </div>
      </ div>
    )
  }
}

const Message = ({ post }: { post: Post }) => (
  <div>
    <p><span>{post.name}</span> [{post.createdAt.toLocaleString()}]</p>
    <p>{post.message}</p>
    <hr />
  </div>
)
