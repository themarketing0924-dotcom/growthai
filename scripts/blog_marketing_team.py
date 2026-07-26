#!/usr/bin/env python3
import os
import sys
import time
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = ROOT_DIR / "generated_blog_outputs"
OUTPUT_DIR.mkdir(exist_ok=True)


def load_api_key() -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key and api_key != "your_openai_api_key_here":
        return api_key

    try:
        from dotenv import load_dotenv
    except ImportError:
        load_dotenv = None

    if load_dotenv is not None:
        load_dotenv(dotenv_path=ROOT_DIR / ".env")
        api_key = os.getenv("OPENAI_API_KEY")
        if api_key and api_key != "your_openai_api_key_here":
            return api_key

    print("OPENAI_API_KEY가 설정되지 않았습니다.")
    api_key = input("API 키를 입력하세요(빈 값이면 종료): ").strip()
    if not api_key:
        print("API 키가 없어 프로그램을 종료합니다.")
        sys.exit(1)

    return api_key


def run_blog_team(topic: str, api_key: str) -> None:
    try:
        from crewai import Agent, Crew, Process, Task
    except ImportError as exc:
        print("CrewAI가 설치되어 있지 않습니다. 아래 명령으로 설치한 뒤 다시 실행하세요.")
        print("pip install crewai python-dotenv")
        raise SystemExit(1) from exc

    os.environ["OPENAI_API_KEY"] = api_key

    print("==================================================")
    print("🤖 블로그 마케팅 전문가팀 AI가 부팅되었습니다.")
    print("==================================================\n")

    strategist = Agent(
        role="마케팅 전략 분석 전문가 (김도윤)",
        goal="주어진 주제에 대한 블로그 마케팅 기획 의도와 타겟을 분석한다.",
        backstory="당신은 10년 차 수석 마케터입니다. 어떤 비즈니스든 핵심 타겟과 소구점을 정확히 짚어냅니다.",
        verbose=True,
        allow_delegation=False,
    )

    seo_expert = Agent(
        role="SEO·키워드 리서치 전문가 (박서연)",
        goal="전략을 바탕으로 검색 노출에 최적화된 핵심 키워드 5개를 추출한다.",
        backstory="당신은 데이터 기반 검색 엔진 최적화 전문가입니다. 트래픽을 끌어올릴 키워드를 찾습니다.",
        verbose=True,
        allow_delegation=False,
    )

    writer = Agent(
        role="콘텐츠 작성 전문가 (최지민)",
        goal="전략과 키워드를 바탕으로 실제 블로그 포스팅 원고를 작성한다.",
        backstory="당신은 흡입력 있는 글을 쓰는 전문 블로그 카피라이터입니다. 가독성 높은 글을 씁니다.",
        verbose=True,
        allow_delegation=False,
    )

    output_strategy = OUTPUT_DIR / "1_김도윤_전략분석.md"
    output_keywords = OUTPUT_DIR / "2_박서연_키워드.md"
    output_article = OUTPUT_DIR / "3_최지민_블로그원고.md"

    task_strategy = Task(
        description=f"주제: {topic}. 이 주제에 대한 타겟 고객과 마케팅 포인트를 3가지로 요약하세요.",
        expected_output="마케팅 포인트 3가지가 담긴 짧은 분석 글",
        agent=strategist,
        output_file=str(output_strategy),
    )

    task_seo = Task(
        description="김도윤의 전략 분석을 읽고, 이 블로그 글에 사용할 메인/서브 키워드 5개를 뽑아주세요.",
        expected_output="해시태그 형태의 키워드 5개와 추천 이유",
        agent=seo_expert,
        output_file=str(output_keywords),
    )

    task_write = Task(
        description="전략과 키워드를 모두 활용하여 1000자 내외의 실제 블로그 포스팅 원고 초안을 작성하세요.",
        expected_output="제목과 본문이 포함된 완성된 블로그 글",
        agent=writer,
        output_file=str(output_article),
    )

    team = Crew(
        agents=[strategist, seo_expert, writer],
        tasks=[task_strategy, task_seo, task_write],
        process=Process.sequential,
    )

    team.kickoff()

    print(f"\n✅ 모든 작업이 완료되었습니다! 결과 파일은 {OUTPUT_DIR} 폴더에서 확인하세요.")


def main() -> None:
    api_key = load_api_key()

    while True:
        topic = input("\n📝 새로운 블로그 주제를 입력하세요 (종료하려면 'exit' 입력): ").strip()
        if topic.lower() == "exit":
            print("시스템을 종료합니다. 수고하셨습니다!")
            break

        if not topic:
            print("주제를 입력해 주세요.")
            continue

        print(f"\n[{topic}] 에 대한 작업을 시작합니다...\n")
        run_blog_team(topic, api_key)
        time.sleep(1)


if __name__ == "__main__":
    main()
