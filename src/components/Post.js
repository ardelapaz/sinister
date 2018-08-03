import React, { Component } from 'react';
import Social from '../components/Social';
import '../App.css';

class Post extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          open: false,
            

        };
      }
      
    render () {
        return (
            <div className = "content">
                <div class="one">
                    <div className = "nested">
                    <img className = 'post-image' src='../images/vein.png'/>
                    <h1 className = "post-title"> Welcome Yoggah to SiNister!</h1>
                    <p className = "post-text">I don't think anybody knows it was Russia that wrote Lorem Ipsum, but I don't know, maybe it was. It could be Russia, but it could also be China. It could also be lots of other people. It also could be some wordsmith sitting on their bed that weights 400 pounds. Ok? That other text? Sadly, it’s no longer a 10. Look at these words. Are they small words? And he referred to my words - if they're small, something else must be small. I guarantee you there's no problem, I guarantee.

The best taco bowls are made in Trump Tower Grill. I love Hispanics! All of the words in Lorem Ipsum have flirted with me - consciously or unconsciously. That's to be expected.

He’s not a word hero. He’s a word hero because he was captured. I like text that wasn’t captured. I will write some great placeholder text – and nobody writes better placeholder text than me, believe me – and I’ll write it very inexpensively. I will write some great, great text on your website’s Southern border, and I will make Google pay for that text. Mark my words. You have so many different things placeholder text has to be able to do, and I don't believe Lorem Ipsum has the stamina. You're telling the enemy exactly what you're going to do. No wonder you've been fighting Lorem Ipsum your entire adult life. I don't think anybody knows it was Russia that wrote Lorem Ipsum, but I don't know, maybe it was. It could be Russia, but it could also be China. It could also be lots of other people. It also could be some wordsmith sitting on their bed that weights 400 pounds. Ok?
I don't think anybody knows it was Russia that wrote Lorem Ipsum, but I don't know, maybe it was. It could be Russia, but it could also be China. It could also be lots of other people. It also could be some wordsmith sitting on their bed that weights 400 pounds. Ok? That other text? Sadly, it’s no longer a 10. Look at these words. Are they small words? And he referred to my words - if they're small, something else must be small. I guarantee you there's no problem, I guarantee.

The best taco bowls are made in Trump Tower Grill. I love Hispanics! All of the words in Lorem Ipsum have flirted with me - consciously or unconsciously. That's to be expected.

He’s not a word hero. He’s a word hero because he was captured. I like text that wasn’t captured. I will write some great placeholder text – and nobody writes better placeholder text than me, believe me – and I’ll write it very inexpensively. I will write some great, great text on your website’s Southern border, and I will make Google pay for that text. Mark my words. You have so many different things placeholder text has to be able to do, and I don't believe Lorem Ipsum has the stamina. You're telling the enemy exactly what you're going to do. No wonder you've been fighting Lorem Ipsum your entire adult life. I don't think anybody knows it was Russia that wrote Lorem Ipsum, but I don't know, maybe it was. It could be Russia, but it could also be China. It could also be lots of other people. It also could be some wordsmith sitting on their bed that weights 400 pounds. Ok?
                    </p>
                    <div className = "post-video">
                        <iframe  width="582.81" height="315" src="https://www.youtube.com/embed/oaDDXCmZE8w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                        <h3 className = "post-ending">Like what you see? Be sure to leave a like and comment on the video!</h3>
                        <h3 className = "post-ending">Never want to miss another video? Be sure to subscribe and turn on notifications!</h3>
                    </div>
                </div>
		        <div class="two">
                    <div className = "post-sidebar">
                        <div class = "social-sidebar">
                            <h2 className = "follow-social">Follow us on social media</h2>
                            <Social />
                        </div>
                        <a className="twitter-timeline" data-width="800" data-height="600" data-theme="dark" data-link-color="#d60000" href="https://twitter.com/TeamSiNisterGG?ref_src=twsrc%5Etfw">Tweets by TeamSiNisterGG</a>
                    </div>
                </div>
            </div>

        );
    }
}

export default Post;