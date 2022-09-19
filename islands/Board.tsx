import { Component } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { fetchCors } from '../shared/fetch.ts';
import { state } from '../shared/store.ts';
import { Post, Posts, cnvPosts } from '../shared/posts.ts';

export default class Board extends Component<{ posts: Posts }, { posts: Posts }> {
  div: HTMLDivElement | undefined | null;
  text: HTMLTextAreaElement | undefined | null;

  scroll = () => {
    setTimeout(() => {
      window.scroll({ top: this.div?.clientHeight, behavior: 'smooth' });
    }, 300);
  }

  // deno-lint-ignore no-explicit-any
  fetchPost = async (method: string, body: any = undefined) => {
    try {
      this.setState({ posts: cnvPosts(await fetchCors('post', method, body)) });
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
    if (IS_BROWSER) {
      this.setState({ posts: cnvPosts(this.props.posts) });
      this.scroll();
    }
  }

  render = () => {
    const d = state.value.isSignIn;

    return (
      <div ref={el => this.div = el} >
        <h2>Board</h2>
        <div>
          {this.state.posts?.map(post => <Message post={post} />)}
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
