# Nyquist–Shannon sampling theorem

Source: https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem
Revision: 1380977741 (2026-10-19T05:32:58Z)
Retrieved: 2026-11-03
License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.

---

The Nyquist–Shannon sampling theorem, or the sampling theorem, is a theorem in the field of signal processing which serves as a fundamental bridge between continuous-time signals and discrete-time signals. In the case of uniformly spaced (periodic) sampling, it establishes a sufficient condition on the sample rate that permits a discrete sequence of samples to capture all the information from a continuous-time signal of finite bandwidth, such that the original signal can be reconstructed exactly from those samples.
Strictly speaking, the theorem only applies to a class of mathematical functions having a Fourier transform that is zero outside of a finite region of frequencies. Intuitively we expect that when one reduces a continuous function to a discrete sequence and interpolates back to a continuous function, the fidelity of the result depends on the density (or sample rate) of the original samples. The sampling theorem introduces the concept of a sample rate that is sufficient for perfect fidelity for the class of functions that are band-limited to a given bandwidth, such that no actual information is lost in the sampling process. It expresses the sufficient sample rate in terms of the bandwidth for the class of functions. The theorem also leads to a formula for perfectly reconstructing the original continuous-time function from the samples.
Perfect reconstruction may still be possible when the sample-rate criterion is not satisfied, provided other constraints on the signal are known (see § Sampling of non-baseband signals below and compressed sensing). In some cases (when the sample-rate criterion is not satisfied), utilizing additional constraints allows for approximate reconstructions. The fidelity of these reconstructions can be verified and quantified utilizing Bochner's theorem.
An important consequence of the sampling theorem is the concept of Nyquist frequency, which holds that in order to reconstruct a bandlimited signal free of aliasing, the sampling rate must be at least twice the signal's bandwidth.
The name Nyquist–Shannon sampling theorem honours Harry Nyquist and Claude Shannon, but the theorem was first proven in a 1920 paper by Kinnosuke Ogura, according to a historical review in 2011. 
The theorem is also known by the names Whittaker–Shannon sampling theorem, Whittaker–Shannon, or Whittaker–Nyquist–Shannon to include E. T. Whittaker since his 1915 paper is sometimes regarded as the first paper on the sampling theorem, though it was actually about an interpolation formula and its proof was unclear and contained errors.
The theorem may also be referred to as the cardinal theorem of interpolation.


== Introduction ==
Sampling is a process of converting a signal (for example, a function of continuous time or space) into a sequence of values (a function of discrete time or space). Shannon's version of the theorem states:

A sufficient sample-rate is therefore anything larger than 
  
    
      
        2
        B
      
    
    {\displaystyle 2B}
  
 samples per second. Equivalently, for a given sample rate 
  
    
      
        
          f
          
            s
          
        
      
    
    {\displaystyle f_{s}}
  
, perfect reconstruction is guaranteed possible for a bandlimit 
  
    
      
        B
        <
        
          f
          
            s
          
        
        
          /
        
        2
      
    
    {\displaystyle B<f_{s}/2}
  
.
When the bandlimit is too high (or there is no bandlimit), the reconstruction exhibits imperfections known as aliasing. Modern statements of the theorem are sometimes careful to explicitly state that 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 must contain no sinusoidal component at exactly frequency 
  
    
      
        B
        ,
      
    
    {\displaystyle B,}
  
 or that 
  
    
      
        B
      
    
    {\displaystyle B}
  
 must be strictly less than one half the sample rate. The threshold 
  
    
      
        2
        B
      
    
    {\displaystyle 2B}
  
 is called the Nyquist rate and is an attribute of the continuous-time input 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 to be sampled. The sample rate must exceed the Nyquist rate for the samples to suffice to represent 
  
    
      
        x
        (
        t
        )
        .
      
    
    {\displaystyle x(t).}
  
 The threshold 
  
    
      
        
          f
          
            s
          
        
        
          /
        
        2
      
    
    {\displaystyle f_{s}/2}
  
 is called the Nyquist frequency and is an attribute of the sampling equipment. All meaningful frequency components of the properly sampled 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 exist below the Nyquist frequency. The condition described by these inequalities is called the Nyquist criterion, or sometimes the Raabe condition. The theorem is also applicable to functions of other domains, such as space, in the case of a digitized image. The only change, in the case of other domains, is the units of measure attributed to 
  
    
      
        t
        ,
      
    
    {\displaystyle t,}
  
 
  
    
      
        
          f
          
            s
          
        
        ,
      
    
    {\displaystyle f_{s},}
  
 and 
  
    
      
        B
        .
      
    
    {\displaystyle B.}
  

The symbol 
  
    
      
        T
        ≜
        1
        
          /
        
        
          f
          
            s
          
        
      
    
    {\displaystyle T\triangleq 1/f_{s}}
  
 is customarily used to represent the interval between adjacent samples and is called the sample period or sampling interval. The samples of function 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 are commonly denoted by 
  
    
      
        x
        [
        n
        ]
        ≜
        T
        ⋅
        x
        (
        n
        T
        )
      
    
    {\displaystyle x[n]\triangleq T\cdot x(nT)}
  
 (alternatively 
  
    
      
        
          x
          
            n
          
        
      
    
    {\displaystyle x_{n}}
  
 in older signal processing literature), for all integer values of 
  
    
      
        n
        .
      
    
    {\displaystyle n.}
  
 The multiplier 
  
    
      
        T
      
    
    {\displaystyle T}
  
 is a result of the transition from continuous time to discrete time (see Discrete-time Fourier transform#Relation to Fourier Transform), and it is needed to preserve the energy of the signal as 
  
    
      
        T
      
    
    {\displaystyle T}
  
 varies.
A mathematically ideal way to interpolate the sequence involves the use of sinc functions. Each sample in the sequence is replaced by a sinc function, centered on the time axis at the original location of the sample 
  
    
      
        n
        T
        ,
      
    
    {\displaystyle nT,}
  
 with the amplitude of the sinc function scaled to the sample value, 
  
    
      
        x
        (
        n
        T
        )
        .
      
    
    {\displaystyle x(nT).}
  
 Subsequently, the sinc functions are summed into a continuous function. A mathematically equivalent method uses the Dirac comb and proceeds by convolving one sinc function with a series of Dirac delta pulses, weighted by the sample values. Neither method is numerically practical. Instead, some type of approximation of the sinc functions, finite in length, is used. The imperfections attributable to the approximation are known as interpolation error.
Practical digital-to-analog converters produce neither scaled and delayed sinc functions, nor ideal Dirac pulses. Instead they produce a piecewise-constant sequence of scaled and delayed rectangular pulses (the zero-order hold), usually followed by a lowpass filter (called an "anti-imaging filter") to remove spurious high-frequency replicas (images) of the original baseband signal.


== Aliasing ==

When 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 is a function with a Fourier transform 
  
    
      
        X
        (
        f
        )
      
    
    {\displaystyle X(f)}
  
:

  
    
      
        X
        (
        f
        )
         
        ≜
         
        
          ∫
          
            −
            ∞
          
          
            ∞
          
        
        x
        (
        t
        )
         
        
          e
          
            −
            i
            2
            π
            f
            t
          
        
         
        
          
            d
          
        
        t
        ,
      
    
    {\displaystyle X(f)\ \triangleq \ \int _{-\infty }^{\infty }x(t)\ e^{-i2\pi ft}\ {\rm {d}}t,}
  

Then the samples 
  
    
      
        x
        [
        n
        ]
      
    
    {\displaystyle x[n]}
  
 of 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 are sufficient to create a periodic summation of 
  
    
      
        X
        (
        f
        )
        .
      
    
    {\displaystyle X(f).}
  
 (see Discrete-time Fourier transform#Relation to Fourier Transform):

which is a periodic function and its equivalent representation as a Fourier series, whose coefficients are 
  
    
      
        x
        [
        n
        ]
      
    
    {\displaystyle x[n]}
  
. This function is also known as the discrete-time Fourier transform (DTFT) of the sample sequence.
As depicted, copies of 
  
    
      
        X
        (
        f
        )
      
    
    {\displaystyle X(f)}
  
 are shifted by multiples of the sampling rate 
  
    
      
        
          f
          
            s
          
        
        =
        1
        
          /
        
        T
      
    
    {\displaystyle f_{s}=1/T}
  
 and combined by addition. For a band-limited function 
  
    
      
        (
        X
        (
        f
        )
        =
        0
        ,
        
           for all 
        
        
          |
        
        f
        
          |
        
        ≥
        B
        )
      
    
    {\displaystyle (X(f)=0,{\text{ for all }}|f|\geq B)}
  
 and sufficiently large 
  
    
      
        
          f
          
            s
          
        
        ,
      
    
    {\displaystyle f_{s},}
  
 it is possible for the copies to remain distinct from each other. But if the Nyquist criterion is not satisfied, adjacent copies overlap, and it is not possible in general to discern an unambiguous 
  
    
      
        X
        (
        f
        )
        .
      
    
    {\displaystyle X(f).}
  
 Any frequency component above 
  
    
      
        
          f
          
            s
          
        
        
          /
        
        2
      
    
    {\displaystyle f_{s}/2}
  
 is indistinguishable from a lower-frequency component, called an alias, associated with one of the copies. In such cases, the customary interpolation techniques produce the alias, rather than the original component. When the sample-rate is pre-determined by other considerations (such as an industry standard), 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 is usually filtered to reduce its high frequencies to acceptable levels before it is sampled. The type of filter required is a lowpass filter, and in this application it is called an anti-aliasing filter.


== Derivation as a special case of Poisson summation ==
When there is no overlap of the copies (also known as "images") of 
  
    
      
        X
        (
        f
        )
      
    
    {\displaystyle X(f)}
  
, the 
  
    
      
        k
        =
        0
      
    
    {\displaystyle k=0}
  
 term of Eq.1 can be recovered by the product:

  
    
      
        X
        (
        f
        )
        =
        H
        (
        f
        )
        ⋅
        
          X
          
            1
            
              /
            
            T
          
        
        (
        f
        )
        ,
      
    
    {\displaystyle X(f)=H(f)\cdot X_{1/T}(f),}
  

where:

  
    
      
        H
        (
        f
        )
         
        ≜
         
        
          
            {
            
              
                
                  1
                
                
                  
                    |
                  
                  f
                  
                    |
                  
                  <
                  B
                
              
              
                
                  0
                
                
                  
                    |
                  
                  f
                  
                    |
                  
                  >
                  
                    f
                    
                      s
                    
                  
                  −
                  B
                  .
                
              
            
            
          
        
      
    
    {\displaystyle H(f)\ \triangleq \ {\begin{cases}1&|f|<B\\0&|f|>f_{s}-B.\end{cases}}}
  

The sampling theorem is proved since 
  
    
      
        X
        (
        f
        )
      
    
    {\displaystyle X(f)}
  
 uniquely determines 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
.
All that remains is to derive the formula for reconstruction. 
  
    
      
        H
        (
        f
        )
      
    
    {\displaystyle H(f)}
  
 need not be precisely defined in the region 
  
    
      
        [
        B
        ,
         
        
          f
          
            s
          
        
        −
        B
        ]
      
    
    {\displaystyle [B,\ f_{s}-B]}
  
 because 
  
    
      
        
          X
          
            1
            
              /
            
            T
          
        
        (
        f
        )
      
    
    {\displaystyle X_{1/T}(f)}
  
 is zero in that region. However, the worst case is when 
  
    
      
        B
        =
        
          f
          
            s
          
        
        
          /
        
        2
        ,
      
    
    {\displaystyle B=f_{s}/2,}
  
 the Nyquist frequency. A function that is sufficient for that and all less severe cases is:

  
    
      
        H
        (
        f
        )
        =
        
          r
          e
          c
          t
        
        
          (
          
            
              f
              
                f
                
                  s
                
              
            
          
          )
        
        =
        
          
            {
            
              
                
                  1
                
                
                  
                    |
                  
                  f
                  
                    |
                  
                  <
                  
                    
                      
                        f
                        
                          s
                        
                      
                      2
                    
                  
                
              
              
                
                  0
                
                
                  
                    |
                  
                  f
                  
                    |
                  
                  >
                  
                    
                      
                        f
                        
                          s
                        
                      
                      2
                    
                  
                  ,
                
              
            
            
          
        
      
    
    {\displaystyle H(f)=\mathrm {rect} \left({\frac {f}{f_{s}}}\right)={\begin{cases}1&|f|<{\frac {f_{s}}{2}}\\0&|f|>{\frac {f_{s}}{2}},\end{cases}}}
  

where 
  
    
      
        
          r
          e
          c
          t
        
      
    
    {\displaystyle \mathrm {rect} }
  
 is the rectangular function. Therefore:

  
    
      
        X
        (
        f
        )
        =
        
          r
          e
          c
          t
        
        
          (
          
            
              f
              
                f
                
                  s
                
              
            
          
          )
        
        ⋅
        
          X
          
            1
            
              /
            
            T
          
        
        (
        f
        )
      
    
    {\displaystyle X(f)=\mathrm {rect} \left({\frac {f}{f_{s}}}\right)\cdot X_{1/T}(f)}
  

  
    
      
        =
        
          r
          e
          c
          t
        
        (
        T
        f
        )
        ⋅
        
          ∑
          
            n
            =
            −
            ∞
          
          
            ∞
          
        
        T
        ⋅
        x
        (
        n
        T
        )
         
        
          e
          
            −
            i
            2
            π
            n
            T
            f
          
        
      
    
    {\displaystyle =\mathrm {rect} (Tf)\cdot \sum _{n=-\infty }^{\infty }T\cdot x(nT)\ e^{-i2\pi nTf}}
  
      (from  Eq.1, above).

  
    
      
        =
        
          ∑
          
            n
            =
            −
            ∞
          
          
            ∞
          
        
        x
        (
        n
        T
        )
        ⋅
        
          
            
              
                T
                ⋅
                
                  r
                  e
                  c
                  t
                
                (
                T
                f
                )
                ⋅
                
                  e
                  
                    −
                    i
                    2
                    π
                    n
                    T
                    f
                  
                
              
              ⏟
            
          
          
            
              
                F
              
            
            
              {
              
                
                  s
                  i
                  n
                  c
                
                
                  (
                  
                    
                      
                        t
                        −
                        n
                        T
                      
                      T
                    
                  
                  )
                
              
              }
            
          
        
        .
      
    
    {\displaystyle =\sum _{n=-\infty }^{\infty }x(nT)\cdot \underbrace {T\cdot \mathrm {rect} (Tf)\cdot e^{-i2\pi nTf}} _{{\mathcal {F}}\left\{\mathrm {sinc} \left({\frac {t-nT}{T}}\right)\right\}}.}
  
     
The inverse transform of both sides produces the Whittaker–Shannon interpolation formula:

  
    
      
        x
        (
        t
        )
        =
        
          ∑
          
            n
            =
            −
            ∞
          
          
            ∞
          
        
        x
        (
        n
        T
        )
        ⋅
        
          s
          i
          n
          c
        
        
          (
          
            
              
                t
                −
                n
                T
              
              T
            
          
          )
        
        ,
      
    
    {\displaystyle x(t)=\sum _{n=-\infty }^{\infty }x(nT)\cdot \mathrm {sinc} \left({\frac {t-nT}{T}}\right),}
  

which shows how the samples, 
  
    
      
        x
        (
        n
        T
        )
      
    
    {\displaystyle x(nT)}
  
, can be combined to reconstruct 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
.

Larger-than-necessary values of 
  
    
      
        
          f
          
            s
          
        
      
    
    {\displaystyle f_{s}}
  
 (smaller values of 
  
    
      
        T
      
    
    {\displaystyle T}
  
), called oversampling, have no effect on the outcome of the reconstruction and have the benefit of leaving room for a transition band in which 
  
    
      
        H
        (
        f
        )
      
    
    {\displaystyle H(f)}
  
 is free to take intermediate values. Undersampling, which causes aliasing, is not in general a reversible operation.
Theoretically, the interpolation formula can be implemented as a low-pass filter, whose impulse response is 
  
    
      
        
          s
          i
          n
          c
        
        (
        t
        
          /
        
        T
        )
      
    
    {\displaystyle \mathrm {sinc} (t/T)}
  
 and whose input is 
  
    
      
        
          
            ∑
            
              n
              =
              −
              ∞
            
            
              ∞
            
          
          x
          (
          n
          T
          )
          ⋅
          δ
          (
          t
          −
          n
          T
          )
          ,
        
      
    
    {\displaystyle \textstyle \sum _{n=-\infty }^{\infty }x(nT)\cdot \delta (t-nT),}
  
 which is a Dirac comb function modulated by the signal samples. Practical digital-to-analog converters (DAC) implement an approximation like the zero-order hold. In that case, oversampling can reduce the approximation error.


== Shannon's original proof ==
Poisson shows that the Fourier series in Eq.1 produces the periodic summation of 
  
    
      
        X
        (
        f
        )
      
    
    {\displaystyle X(f)}
  
, regardless of 
  
    
      
        
          f
          
            s
          
        
      
    
    {\displaystyle f_{s}}
  
 and 
  
    
      
        B
      
    
    {\displaystyle B}
  
. Shannon, however, only derives the series coefficients for the case 
  
    
      
        
          f
          
            s
          
        
        =
        2
        B
      
    
    {\displaystyle f_{s}=2B}
  
. Virtually quoting Shannon's original paper:

Let 
  
    
      
        X
        (
        ω
        )
      
    
    {\displaystyle X(\omega )}
  
 be the spectrum of 
  
    
      
        x
        (
        t
        )
        .
      
    
    {\displaystyle x(t).}
  
  Then

  
    
      
        x
        (
        t
        )
        =
        
          
            1
            
              2
              π
            
          
        
        
          ∫
          
            −
            ∞
          
          
            ∞
          
        
        X
        (
        ω
        )
        
          e
          
            i
            ω
            t
          
        
        
        
          
            d
          
        
        ω
        =
        
          
            1
            
              2
              π
            
          
        
        
          ∫
          
            −
            2
            π
            B
          
          
            2
            π
            B
          
        
        X
        (
        ω
        )
        
          e
          
            i
            ω
            t
          
        
        
        
          
            d
          
        
        ω
        ,
      
    
    {\displaystyle x(t)={1 \over 2\pi }\int _{-\infty }^{\infty }X(\omega )e^{i\omega t}\;{\rm {d}}\omega ={1 \over 2\pi }\int _{-2\pi B}^{2\pi B}X(\omega )e^{i\omega t}\;{\rm {d}}\omega ,}
  

because 
  
    
      
        X
        (
        ω
        )
      
    
    {\displaystyle X(\omega )}
  
 is assumed to be zero outside the band 
  
    
      
        
          |
          
            
              
                ω
                
                  2
                  π
                
              
            
          
          |
        
        <
        B
        .
      
    
    {\displaystyle \left|{\tfrac {\omega }{2\pi }}\right|<B.}
  
  If we let 
  
    
      
        t
        =
        
          
            
              n
              
                2
                B
              
            
          
        
        ,
      
    
    {\displaystyle t={\tfrac {n}{2B}},}
  
 where 
  
    
      
        n
      
    
    {\displaystyle n}
  
 is any positive or negative integer, we obtain:

On the left are values of 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 at the sampling points. The integral on the right will be recognized as essentially the 
  
    
      
        
          n
          
            t
            h
          
        
      
    
    {\displaystyle n^{th}}
  
 coefficient in a Fourier-series expansion of the function 
  
    
      
        X
        (
        ω
        )
        ,
      
    
    {\displaystyle X(\omega ),}
  
 taking the interval 
  
    
      
        −
        B
      
    
    {\displaystyle -B}
  
 to 
  
    
      
        B
      
    
    {\displaystyle B}
  
 as a fundamental period. This means that the values of the samples 
  
    
      
        x
        (
        n
        
          /
        
        2
        B
        )
      
    
    {\displaystyle x(n/2B)}
  
 determine the Fourier coefficients in the series expansion of 
  
    
      
        X
        (
        ω
        )
        .
      
    
    {\displaystyle X(\omega ).}
  
  Thus they determine 
  
    
      
        X
        (
        ω
        )
        ,
      
    
    {\displaystyle X(\omega ),}
  
 since 
  
    
      
        X
        (
        ω
        )
      
    
    {\displaystyle X(\omega )}
  
 is zero for frequencies greater than 
  
    
      
        B
        ,
      
    
    {\displaystyle B,}
  
 and for lower frequencies 
  
    
      
        X
        (
        ω
        )
      
    
    {\displaystyle X(\omega )}
  
 is determined if its Fourier coefficients are determined. But 
  
    
      
        X
        (
        ω
        )
      
    
    {\displaystyle X(\omega )}
  
 determines the original function 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 completely, since a function is determined if its spectrum is known. Therefore the original samples determine the function 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 completely.
Shannon's proof of the theorem is complete at that point, but he goes on to discuss reconstruction via sinc functions, what we now call the Whittaker–Shannon interpolation formula as discussed above. He does not derive or prove the properties of the sinc function, as the Fourier pair relationship between the rect (the rectangular function) and sinc functions was well known by that time.

Let 
  
    
      
        
          x
          
            n
          
        
      
    
    {\displaystyle x_{n}}
  
 be the 
  
    
      
        
          n
          
            t
            h
          
        
      
    
    {\displaystyle n^{th}}
  
 sample. Then the function 
  
    
      
        x
        (
        t
        )
      
    
    {\displaystyle x(t)}
  
 is represented by:

  
    
      
        x
        (
        t
        )
        =
        
          ∑
          
            n
            =
            −
            ∞
          
          
            ∞
          
        
        
          x
          
            n
          
        
        
          
            
              sin
              ⁡
              (
              π
              (
              2
              B
              t
              −
              n
              )
              )
            
            
              π
              (
              2
              B
              t
              −
              n
              )
            
          
        
        .
      
    
    {\displaystyle x(t)=\sum _{n=-\infty }^{\infty }x_{n}{\sin(\pi (2Bt-n)) \over \pi (2Bt-n)}.}
  

As in the other proof, the existence of the Fourier transform of the original signal is assumed, so the proof does not say whether the sampling theorem extends to bandlimited stationary random processes.


=== Notes ===


== Application to multivariable signals and images ==

The sampling theorem is usually formulated for functions of a single variable. Consequently, the theorem is directly applicable to time-dependent signals and is normally formulated in that context. However, the sampling theorem can be extended in a straightforward way to functions of arbitrarily many variables. Grayscale images, for example, are often represented as two-dimensional arrays (or matrices) of real numbers representing the relative intensities of pixels (picture elements) located at the intersections of row and column sample locations. As a result, images require two independent variables, or indices, to specify each pixel uniquely—one for the row, and one for the column.
Color images typically consist of a composite of three separate grayscale images, one to represent each of the three primary colors—red, green, and blue, or RGB for short. Other colorspaces using 3-vectors for colors include HSV, CIELAB, XYZ, etc. Some colorspaces such as cyan, magenta, yellow, and black (CMYK) may represent color by four dimensions. All of these are treated as vector-valued functions over a two-dimensional sampled domain.
Similar to one-dimensional discrete-time signals, images can also suffer from aliasing if the sampling resolution, or pixel density, is inadequate. For example, a digital photograph of a striped shirt with high frequencies (in other words, the distance between the stripes is small), can cause aliasing of the shirt when it is sampled by the camera's image sensor. The aliasing appears as a moiré pattern. The "solution" to higher sampling in the spatial domain for this case would be to move closer to the shirt, use a higher resolution sensor, or to optically blur the image before acquiring it with the sensor using an optical low-pass filter.
Another example is shown here in the brick patterns. The top image shows the effects when the sampling theorem's condition is not satisfied. When software rescales an image (the same process that creates the thumbnail shown in the lower image) it, in effect, runs the image through a low-pass filter first and then downsamples the image to result in a smaller image that does not exhibit the moiré pattern. The top image is what happens when the image is downsampled without low-pass filtering: aliasing results.
The sampling theorem applies to camera systems, where the scene and lens constitute an analog spatial signal source, and the image sensor is a spatial sampling device. Each of these components is characterized by a modulation transfer function (MTF), representing the precise resolution (spatial bandwidth) available in that component.  Effects of aliasing or blurring can occur when the lens MTF and sensor MTF are mismatched. When the optical image which is sampled by the sensor device contains higher spatial frequencies than the sensor, the under sampling acts as a low-pass filter to reduce or eliminate aliasing. When the area of the sampling spot (the size of the pixel sensor) is not large enough to provide sufficient spatial anti-aliasing, a separate anti-aliasing filter (optical low-pass filter) may be included in a camera system to reduce the MTF of the optical image. Instead of requiring an optical filter, the graphics processing unit of smartphone cameras performs digital signal processing to remove aliasing with a digital filter. Digital filters also apply sharpening to amplify the contrast from the lens at high spatial frequencies, which otherwise falls off rapidly at diffraction limits.
The sampling theorem also applies to post-processing digital images, such as to up or down sampling. Effects of aliasing, blurring, and sharpening may be adjusted with digital filtering implemented in software, which necessarily follows the theoretical principles.


== Critical frequency ==
To illustrate the necessity of 
  
    
      
        
          f
          
            s
          
        
        >
        2
        B
        ,
      
    
    {\displaystyle f_{s}>2B,}
  
 consider the family of sinusoids generated by different values of 
  
    
      
        θ
      
    
    {\displaystyle \theta }
  
 in this continuous-time signal:

  
    
      
        
          
            
              
                x
                (
                t
                )
              
              
                
                =
                
                  
                    
                      cos
                      ⁡
                      (
                      2
                      π
                      B
                      t
                      +
                      θ
                      )
                    
                    
                      cos
                      ⁡
                      (
                      θ
                      )
                    
                  
                
                ,
                
                −
                π
                
                  /
                
                2
                <
                θ
                <
                π
                
                  /
                
                2
              
            
            
              
              
                
                =
                 
                cos
                ⁡
                (
                2
                π
                B
                t
                )
                −
                sin
                ⁡
                (
                2
                π
                B
                t
                )
                tan
                ⁡
                (
                θ
                )
                .
              
            
          
        
      
    
    {\displaystyle {\begin{aligned}x(t)&={\frac {\cos(2\pi Bt+\theta )}{\cos(\theta )}},\qquad -\pi /2<\theta <\pi /2\\&=\ \cos(2\pi Bt)-\sin(2\pi Bt)\tan(\theta ).\end{aligned}}}
  

With 
  
    
      
        
          f
          
            s
          
        
        =
        2
        B
      
    
    {\displaystyle f_{s}=2B}
  
 or equivalently 
  
    
      
        T
        =
        1
        
          /
        
        2
        B
        ,
      
    
    {\displaystyle T=1/2B,}
  
 the samples are given by:

  
    
      
        x
        (
        n
        T
        )
        =
        cos
        ⁡
        (
        π
        n
        )
        −
        
          
            
              
                sin
                ⁡
                (
                π
                n
                )
              
              ⏟
            
          
          
            0
          
        
        tan
        ⁡
        (
        θ
        )
        =
        (
        −
        1
        
          )
          
            n
          
        
      
    
    {\displaystyle x(nT)=\cos(\pi n)-\underbrace {\sin(\pi n)} _{0}\tan(\theta )=(-1)^{n}}
  

regardless of the value of 
  
    
      
        θ
        .
      
    
    {\displaystyle \theta .}
  
 That sort of ambiguity is the reason for the strict inequality of the sampling theorem's condition.


== Sampling of non-baseband signals ==
As discussed by Shannon:

A similar result is true if the band does not start at zero frequency but at some higher value, and can be proved by a linear translation (corresponding physically to single-sideband modulation) of the zero-frequency case. In this case the elementary pulse is obtained from 
  
    
      
        sin
        ⁡
        (
        x
        )
        
          /
        
        x
      
    
    {\displaystyle \sin(x)/x}
  
 by single-side-band modulation.
That is, a sufficient no-loss condition for sampling signals that do not have baseband components exists that involves the width of the non-zero frequency interval as opposed to its highest frequency component. See sampling for more details and examples.
For example, in order to sample FM radio signals in the frequency range of 100–102 MHz, it is not necessary to sample at 204 MHz (twice the upper frequency), but rather it is sufficient to sample at 4 MHz (twice the width of the frequency interval). (Reconstruction is not usually the goal with sampled IF or RF signals.  Rather, the sample sequence can be treated as ordinary samples of the signal frequency-shifted to near baseband, and digital demodulation can proceed on that basis.)
Using the bandpass condition, where  
  
    
      
        X
        (
        f
        )
        =
        0
      
    
    {\displaystyle X(f)=0}
  
 for all 
  
    
      
        
          |
        
        f
        
          |
        
      
    
    {\displaystyle |f|}
  
 outside the open band of frequencies

  
    
      
        
          (
          
            
              
                N
                2
              
            
            
              f
              
                
                  s
                
              
            
            ,
            
              
                
                  N
                  +
                  1
                
                2
              
            
            
              f
              
                
                  s
                
              
            
          
          )
        
        ,
      
    
    {\displaystyle \left({\frac {N}{2}}f_{\mathrm {s} },{\frac {N+1}{2}}f_{\mathrm {s} }\right),}
  

for some nonnegative integer 
  
    
      
        N
      
    
    {\displaystyle N}
  
 and some sampling frequency 
  
    
      
        
          f
          
            
              s
            
          
        
      
    
    {\displaystyle f_{\mathrm {s} }}
  
, it is possible to find an interpolation that reproduces the signal. Note that there may be several combinations of 
  
    
      
        N
      
    
    {\displaystyle N}
  
 and 
  
    
      
        
          f
          
            
              s
            
          
        
      
    
    {\displaystyle f_{\mathrm {s} }}
  
 that work, including the normal baseband condition as the case 
  
    
      
        N
        =
        0.
      
    
    {\displaystyle N=0.}
  
 The corresponding interpolation filter to be convolved with the sample is the impulse response of an ideal "brick-wall" bandpass filter (as opposed to the ideal brick-wall lowpass filter used above) with cutoffs at the upper and lower edges of the specified band, which is the difference between a pair of lowpass impulse responses:

  
    
      
        (
        N
        +
        1
        )
        
        sinc
        ⁡
        
          (
          
            
              
                (
                N
                +
                1
                )
                t
              
              T
            
          
          )
        
        −
        N
        
        sinc
        ⁡
        
          (
          
            
              
                N
                t
              
              T
            
          
          )
        
        .
      
    
    {\displaystyle (N+1)\,\operatorname {sinc} \left({\frac {(N+1)t}{T}}\right)-N\,\operatorname {sinc} \left({\frac {Nt}{T}}\right).}
  

This function is 1 at 
  
    
      
        t
        =
        0
      
    
    {\displaystyle t=0}
  
 and zero at any other multiple of 
  
    
      
        T
      
    
    {\displaystyle T}
  
 (as well as at other times if 
  
    
      
        N
        >
        0
      
    
    {\displaystyle N>0}
  
).
Other generalizations, for example to signals occupying multiple non-contiguous bands, are possible as well. Even the most generalized form of the sampling theorem does not have a provably true converse. That is, one cannot conclude that information is necessarily lost just because the conditions of the sampling theorem are not satisfied; from an engineering perspective, however, it is generally safe to assume that if the sampling theorem is not satisfied then information will most likely be lost.


== Nonuniform sampling ==
The sampling theory of Shannon can be generalized for the case of nonuniform sampling, that is, samples not taken equally spaced in time. The Shannon sampling theory for non-uniform sampling states that a band-limited signal can be perfectly reconstructed from its samples if the average sampling rate satisfies the Nyquist condition. Therefore, although uniformly spaced samples may result in easier reconstruction algorithms, it is not a necessary condition for perfect reconstruction.
The general theory for non-baseband and nonuniform samples was developed in 1967 by Henry Landau. He proved that the average sampling rate (uniform or otherwise) must be twice the occupied bandwidth of the signal, assuming it is a priori known what portion of the spectrum was occupied.
In the late 1990s, this work was partially extended to cover signals for which the amount of occupied bandwidth is known but the actual occupied portion of the spectrum is unknown. In the 2000s, a complete theory was developed
(see the section Sampling below the Nyquist rate under additional restrictions below) using compressed sensing. In particular, the theory, using signal processing language, is described in a 2009 paper by Mishali and Eldar. They show, among other things, that if the frequency locations are unknown, then it is necessary to sample at least at twice the Nyquist criteria; in other words, you must pay at least a factor of 2 for not knowing the location of the spectrum. Note that minimum sampling requirements do not necessarily guarantee stability.


== Sampling below the Nyquist rate under additional restrictions ==

The Nyquist–Shannon sampling theorem provides a sufficient condition for the sampling and reconstruction of a band-limited signal. When reconstruction is done via the Whittaker–Shannon interpolation formula, the Nyquist criterion is also a necessary condition to avoid aliasing, in the sense that if samples are taken at a slower rate than twice the band limit, then there are some signals that will not be correctly reconstructed. However, if further restrictions are imposed on the signal, then the Nyquist criterion may no longer be a necessary condition.
A non-trivial example of exploiting extra assumptions about the signal is given by the recent field of compressed sensing, which allows for full reconstruction with a sub-Nyquist sampling rate. Specifically, this applies to signals that are sparse (or compressible) in some domain. As an example, compressed sensing deals with signals that may have a low overall bandwidth (say, the effective bandwidth 
  
    
      
        E
        B
      
    
    {\displaystyle EB}
  
) but the frequency locations are unknown, rather than all together in a single band, so that the passband technique does not apply. In other words, the frequency spectrum is sparse. Traditionally, the necessary sampling rate is thus 
  
    
      
        2
        B
        .
      
    
    {\displaystyle 2B.}
  
 Using compressed sensing techniques, the signal could be perfectly reconstructed if it is sampled at a rate slightly lower than 
  
    
      
        2
        E
        B
        .
      
    
    {\displaystyle 2EB.}
  
 With this approach, reconstruction is no longer given by a formula, but instead by the solution to a linear optimization program.
Another example where sub-Nyquist sampling is optimal arises under the additional constraint that the samples are quantized in an optimal manner, as in a combined system of sampling and optimal lossy compression. This setting is relevant in cases where the joint effect of sampling and quantization is to be considered, and can provide a lower bound for the minimal reconstruction error that can be attained in sampling and quantizing a random signal. For stationary Gaussian random signals, this lower bound is usually attained at a sub-Nyquist sampling rate, indicating that sub-Nyquist sampling is optimal for this signal model under optimal quantization.


== Historical background ==
According to a 2011 historical review by Butzer et al., which investigated the history of the sampling theorem, the theorem was first proven in a 1920 paper by Kinnosuke Ogura. Although a paper published by E. T. Whittaker in 1915—prior to Ogura’s work—is sometimes regarded as the first paper on the sampling theorem, the paper actually presented an interpolation formula (the converse of the sampling theorem) and, moreover, the proof was unclear and contained errors.
Harry Nyquist in his 1924 and 1928 papers pointed out the importance of the frequency 1/“time unit” as well as its connection with the speed of transmission, but  these two papers did not state the sampling theorem explicitly anywhere nor contain a statement about sampling at twice the maximum frequency of the input signal, although these two papers are often cited as sources of the sampling theorem. The terms Nyquist interval or Nyquist rate "very likely had their origin" in Shannon’s paper of 1949.
About the same time, Karl Küpfmüller showed a similar result and discussed the sinc-function impulse response of a band-limiting filter, via its integral, the step-response sine integral; this bandlimiting and reconstruction filter that is so central to the sampling theorem is sometimes referred to as a Küpfmüller filter (but seldom so in English).
Claude E. Shannon is often considered as an inventor of the sampling theorem due to his papers from 1948 and 1949, although "he never claimed any credit for originating it". In "Theorem 13" of the paper "A Mathematical Theory of Communication" of 1948, the sampling theorem is formulated as:
  
    
      
        f
        (
        t
        )
        =
        
          ∑
          
            n
            =
            −
            ∞
          
          
            ∞
          
        
        
          X
          
            n
          
        
        
          
            
              sin
              ⁡
              π
              (
              2
              W
              t
              −
              n
              )
            
            
              π
              (
              2
              W
              t
              −
              n
              )
            
          
        
        ,
      
    
    {\displaystyle f(t)=\sum _{n=-\infty }^{\infty }X_{n}{\frac {\sin \pi (2Wt-n)}{\pi (2Wt-n)}},}
  
where 
  
    
      
        f
        (
        t
        )
      
    
    {\displaystyle f(t)}
  
 contains no frequencies over 
  
    
      
        W
      
    
    {\displaystyle W}
  
 and 
  
    
      
        
          X
          
            n
          
        
        =
        f
        
          (
          
            
              n
              
                2
                W
              
            
          
          )
        
        .
      
    
    {\displaystyle X_{n}=f\left({\frac {n}{2W}}\right).}
  

It was not until these articles were published that the theorem known as "Shannon's sampling theorem" became common property among communication engineers, although Shannon himself writes that this is a fact which is common knowledge in the communication art. A few lines further on, however, he adds: "but in spite of its evident importance, [it] seems not to have appeared explicitly in the literature of communication theory". Despite his sampling theorem being published at the end of the 1940s, Shannon had derived his sampling theorem as early as 1940.


=== Other discoverers ===
Others who have independently discovered or played roles in the development of the sampling theorem have been discussed in several historical articles, for example, by Jerri and by Lüke. For example, Lüke points out that Herbert Raabe, an assistant to Küpfmüller, proved the theorem in his 1939 Ph.D. dissertation; the term Raabe condition came to be associated with the criterion for unambiguous representation (sampling rate greater than twice the bandwidth).  Meijering mentions several other discoverers and names in a paragraph and pair of footnotes:

As pointed out by Higgins, the sampling theorem should really be considered in two parts, as done above: the first stating the fact that a bandlimited function is completely determined by its samples, the second describing how to reconstruct the function using its samples. Both parts of the sampling theorem were given in a somewhat different form by J. M. Whittaker and before him also by Ogura. They were probably not aware of the fact that the first part of the theorem had been stated as early as 1897 by Borel. As we have seen, Borel also used around that time what became known as the cardinal series. However, he appears not to have made the link. In later years it became known that the sampling theorem had been presented before Shannon to the Russian communication community by Kotel'nikov. In more implicit, verbal form, it had also been described in the German literature by Raabe. Several authors have mentioned that Someya introduced the theorem in the Japanese literature parallel to Shannon. In the English literature, Weston introduced it independently of Shannon around the same time.

In Russian literature it is called Kotelnikov's theorem, named after Vladimir Kotelnikov, who independently discovered it in 1933.


=== Why Nyquist? ===
Exactly how, when, or why Harry Nyquist had his name attached to the sampling theorem remains obscure. The term Nyquist Sampling Theorem (capitalized thus) appeared as early as 1959 in a book from his former employer, Bell Labs, and appeared again in 1963, and not capitalized in 1965. It had been called the Shannon Sampling Theorem as early as 1954, but also just the sampling theorem by several other books in the early 1950s.
In 1958, Blackman and Tukey cited Nyquist's 1928 article as a reference for the sampling theorem of information theory, even though that article does not treat sampling and reconstruction of continuous signals as others did. Their glossary of terms includes these entries:

Sampling theorem (of information theory)
Nyquist's result that equi-spaced data, with two or more points per cycle of highest frequency, allows reconstruction of band-limited functions. (See Cardinal theorem.)
Cardinal theorem (of interpolation theory)
A precise statement of the conditions under which values given at a doubly infinite set of equally spaced points can be interpolated to yield a continuous band-limited function with the aid of the function 
  
    
      
        
          
            
              sin
              ⁡
              (
              x
              −
              
                x
                
                  i
                
              
              )
            
            
              x
              −
              
                x
                
                  i
                
              
            
          
        
        .
      
    
    {\displaystyle {\frac {\sin(x-x_{i})}{x-x_{i}}}.}
  

Exactly what "Nyquist's result" they are referring to remains mysterious.
When Shannon stated and proved the sampling theorem in his 1949 article, according to Meijering, "he referred to the critical sampling interval 
  
    
      
        T
        =
        
          
            1
            
              2
              W
            
          
        
      
    
    {\displaystyle T={\frac {1}{2W}}}
  
 as the Nyquist interval corresponding to the band 
  
    
      
        W
        ,
      
    
    {\displaystyle W,}
  
 in recognition of Nyquist's discovery of the fundamental importance of this interval in connection with telegraphy". This explains Nyquist's name on the critical interval, but not on the theorem.
Similarly, Nyquist's name was attached to Nyquist rate in 1953 by Harold S. Black:

If the essential frequency range is limited to 
  
    
      
        B
      
    
    {\displaystyle B}
  
 cycles per second, 
  
    
      
        2
        B
      
    
    {\displaystyle 2B}
  
 was given by Nyquist as the maximum number of code elements per second that could be unambiguously resolved, assuming the peak interference is less than half a quantum step. This rate is generally referred to as signaling at the Nyquist rate and 
  
    
      
        
          
            1
            
              2
              B
            
          
        
      
    
    {\displaystyle {\frac {1}{2B}}}
  
 has been termed a Nyquist interval.
According to the Oxford English Dictionary, this may be the origin of the term Nyquist rate. In Black's usage, it is not a sampling rate, but a signaling rate.


== See also ==
44,100 Hz, a customary rate used to sample audible frequencies is based on the limits of human hearing and the sampling theorem
Balian–Low theorem, a similar theoretical lower bound on sampling rates, but which applies to time–frequency transforms
Cheung–Marks theorem, which specifies conditions where restoration of a signal by the sampling theorem can become ill-posed
Shannon–Hartley theorem
Nyquist ISI criterion
Reconstruction from zero crossings
Zero-order hold
Dirac comb


== Notes ==


== References ==


== Further reading ==


== External links ==

Learning by Simulations Interactive simulation of the effects of inadequate sampling
Interactive presentation of the sampling and reconstruction in a web-demo Institute of Telecommunications, University of Stuttgart
Undersampling and an application of it
Sampling Theory For Digital Audio
Journal devoted to Sampling Theory
Huang, J.; Padmanabhan, K.; Collins, O.M. (June 2011). "The Sampling Theorem With Constant Amplitude Variable Width Pulses". IEEE Transactions on Circuits and Systems I: Regular Papers. 58 (6): 1178–90. Bibcode:2011ITCSR..58.1178H. doi:10.1109/TCSI.2010.2094350. S2CID 13590085.
Lüke, Hans Dieter (April 1999). "The Origins of the Sampling Theorem" (PDF). IEEE Communications Magazine. 37 (4): 106–108. doi:10.1109/35.755459.
