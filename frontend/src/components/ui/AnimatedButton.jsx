import useGlitchAnimation from '../../utils/useGlitchAnimation'

const AnimatedButton = ({ Text,isPending }) => {
    const displayText = useGlitchAnimation(Text,isPending);
  
    return (
      <button
        type="submit"
        disabled={isPending}
        className={`w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2 bg-white border-2 border-black text-black rounded-none font-['Press_Start_2P'] text-sm transform hover:-translate-y-1 transition duration-200 hover:bg-green-400/10 ${
          isPending ? 'glitch-button' : ''
        }`}
      >
        <span className="relative z-10">
          {isPending ? displayText : Text}
        </span>
      </button>
    );
  };

export default AnimatedButton