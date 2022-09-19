import { Component } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { fetchCors } from '../shared/fetch.ts';

interface Post {
  message: string;
  updatedAt: Date;
  name: string;
}

// deno-lint-ignore ban-types
export default class Board extends Component<{}, { posts: Post[] }> {
  div: HTMLDivElement | undefined | null;
  text: HTMLTextAreaElement | undefined | null;

  scroll = () => {
    setTimeout(() => {
      window.scroll({ top: this.div?.clientHeight, behavior: 'smooth' });
    }, 300);
  }

  cnvPosts = (posts: { message: string; updatedAt: string; name: string; }[]) =>
    posts.map(post => ({ ...post, updatedAt: new Date(post.updatedAt) }));

  // deno-lint-ignore no-explicit-any
  fetchPost = async (method: string, body: any = undefined) => {
    try {
      this.setState({ posts: this.cnvPosts(await fetchCors('post', method, body)) });
      this.scroll();
    } catch (e) {
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
      this.fetchPost('get');
  }

  render = () => (
    <div ref={el => this.div = el} >
      <h2>Board</h2>
      <div>
        {this.state.posts?.map(post => <Message post={post} />)}
      </div>
      <div class='bottom'>
        <div>
          <textarea ref={el => this.text = el} ></textarea>
        </div>
        <button onClick={this.onSend}>Send</button>
      </div>
    </ div>
  )
}

const Message = ({ post }: { post: Post }) => (
  <div>
    <p><span>{post.name}</span> [{post.updatedAt.toLocaleString()}]</p>
    <p>{post.message}</p>
    <hr />
  </div>
)
